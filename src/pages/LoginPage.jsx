import React, { useContext, useReducer, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { debounce } from "lodash";
import axios from "axios";
import { useSnackbar } from "notistack";
import {
  Container,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { getMessaging, getToken } from "firebase/messaging";

// INTERNAL IMPORT
import Style from "./page.module.css";
import { PasswordInput } from "../components";
import { LOGIN_URI } from "../constants/api";
import {
  AUTH_HEADER_CONFIG,
  CLICK_INTERVAL_MILLISECOND,
} from "../constants/config";
import { SIGNUP_PATH } from "../constants/route";
import { AuthContext } from "../contexts/AuthContext";

// VO
const initialState = {
  userID: "",
  password: "",
  isAutoLogin: true,
};

const initialValidityState = {
  userIDError: null,
  passwordError: null,
};

// MAIN
function LoginPage() {
  const { payLoadReducer, payLoadValidityReducer, isAllValid, setUserID } =
    useContext(AuthContext);
  const [payload, setPayload] = useReducer(payLoadReducer, initialState);
  const [payloadValidity, setPayloadValidity] = useReducer(
    payLoadValidityReducer,
    initialValidityState
  );
  const [isValid, setIsValid] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  useEffect(() => {
    setIsValid(isAllValid(payloadValidity));
  }, [payloadValidity]);

  const handleSubmit = async () => {
    const permission = await Notification.requestPermission();

    try {
      if (permission === "denied") {
        throw new Error("알림 허용을 해주세요.");
      }

      const token = await getToken(getMessaging(), {
        vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
      });

      const { data } = await axios({
        method: "patch",
        url: LOGIN_URI,
        auth: {
          username: payload.userID,
          password: payload.password,
        },
        data: {
          isAutoLogin: payload.isAutoLogin,
          fcmToken: token,
        },
        ...AUTH_HEADER_CONFIG,
      });

      setUserID(data.result.userID);
      history.push("/");
    } catch (error) {
      const { message } = error.response?.data || error;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return (
    <Container className={Style.container}>
      <Typography variant="h5">로그인</Typography>

      <Box className={Style.formContainer}>
        <TextField
          required
          error={payloadValidity.userIDError}
          helperText={
            payloadValidity.userIDError && "숫자와 문자 조합만 허용합니다."
          }
          variant="standard"
          label="아이디"
          name="userID"
          inputProps={{
            onBlur: () => {
              setPayloadValidity({
                type: "VALIDATE_USER_ID",
                value: payload.userID,
              });
              setIsValid(isAllValid(payloadValidity));
            },
          }}
          onChange={(event) => setPayload({ type: event.target })}
        />

        <PasswordInput
          payload={payload}
          setPayload={setPayload}
          setPayloadValidity={setPayloadValidity}
          isError={payloadValidity.passwordError}
        />

        <FormControlLabel
          name="isAutoLogin"
          control={<Checkbox defaultChecked />}
          label="자동로그인"
          onChange={(event) => setPayload({ type: event.target })}
        />

        <Button
          disabled={!isValid}
          onClick={debounce(handleSubmit, CLICK_INTERVAL_MILLISECOND)}
        >
          제출
        </Button>
      </Box>

      <Box component={Link} to={SIGNUP_PATH}>
        계정이 없으신가요?
      </Box>
    </Container>
  );
}

export default LoginPage;
