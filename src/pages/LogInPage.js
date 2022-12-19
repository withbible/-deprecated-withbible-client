import React, { useContext, useReducer, useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { useHistory, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

//INTERNAL IMPORT
import Style from "./page.module.css";
import { LOG_IN_URI } from "../constants/api";
import { SIGN_UP_PATH } from "../constants/route";
import { PasswordInput } from "../components";
import { AuthContext } from "../context/AuthContext";

const LogInPage = () => {
  const { payLoadReducer, payLoadValidityReducer, isAllValid } =
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.patch(LOG_IN_URI, payload);
      history.push("/");
    } catch (error) {
      const message = error.response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return (
    <Container className={Style.container}>
      <Typography variant="h5">로그인</Typography>

      <Box
        component="form"
        className={Style.formContainer}
        onSubmit={handleSubmit}
      >
        <TextField
          required          
          error={payloadValidity.userIDError}
          helperText={
            payloadValidity.userIDError ? "숫자와 문자 조합만 허용합니다." : ""
          }
          variant="standard"
          label="아이디"
          name="userID"
          inputProps={{
            onBlur: () => {
              setPayloadValidity({
                type: "VALIDATE_USER_ID",
                payload,
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

        {/* TODO: 세션 재발급으로 차후 구현 필요 */}
        <FormControlLabel
          name="isLogInCheck"
          control={<Checkbox defaultChecked />}
          label="자동로그인"
        />
        <Button disabled={!isValid} type="submit">
          제출
        </Button>
      </Box>

      <Box component={Link} to={SIGN_UP_PATH}>
        계정이 없으신가요?
      </Box>
    </Container>
  );
};

export default LogInPage;

const initialState = {
  userID: "",
  password: "",
};

const initialValidityState = {
  userIDError: null,
  passwordError: null,
};
