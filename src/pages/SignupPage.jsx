import React, { useContext, useReducer, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { debounce } from "lodash";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { getMessaging, getToken } from "firebase/messaging";

// INTERNAL IMPORT
import Style from "./page.module.css";
import { PasswordInput } from "../components";
import { SIGNUP_URI } from "../constants/api";
import {
  AUTH_HEADER_CONFIG,
  CLICK_INTERVAL_MILLISECOND,
} from "../constants/config";
import { LOGIN_PATH } from "../constants/route";
import { AuthContext } from "../contexts/AuthContext";

// VO
const initialState = {
  userEmail: "",
  userID: "",
  password: "",
};

const initialValidityState = {
  userEmailError: null,
  userIDError: null,
  passwordError: null,
};

// MAIN
function SignupPage() {
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
        method: "post",
        url: SIGNUP_URI,
        auth: {
          username: payload.userID,
          password: payload.password,
        },
        data: {
          userEmail: payload.userEmail,
          fcmToken: token,
        },
        ...AUTH_HEADER_CONFIG,
      });

      setUserID(data.result.userID);
      history.push("/");
    } catch (error) {
      const { message } = error.response.data;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return (
    <Container className={Style.container}>
      <Typography variant="h5">회원가입</Typography>

      <Box className={Style.formContainer}>
        <TextField
          required
          error={payloadValidity.userEmailError}
          helperText={
            payloadValidity.userEmailError && "이메일 형식에 맞지 않습니다."
          }
          variant="standard"
          label="이메일"
          name="userEmail"
          inputProps={{
            onBlur: () =>
              setPayloadValidity({
                type: "VALIDATE_USER_EMAIL",
                value: payload.userEmail,
              }),
          }}
          onChange={(event) => setPayload({ type: event.target })}
        />

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
            onBlur: () =>
              setPayloadValidity({
                type: "VALIDATE_USER_ID",
                value: payload.userID,
              }),
          }}
          onChange={(event) => setPayload({ type: event.target })}
        />

        <PasswordInput
          payload={payload}
          setPayload={setPayload}
          setPayloadValidity={setPayloadValidity}
          isError={payloadValidity.passwordError}
        />

        <Button
          disabled={!isValid}
          onClick={debounce(handleSubmit, CLICK_INTERVAL_MILLISECOND)}
        >
          제출
        </Button>
      </Box>

      <Box component={Link} to={LOGIN_PATH}>
        계정이 있으신가요?
      </Box>
    </Container>
  );
}

export default SignupPage;
