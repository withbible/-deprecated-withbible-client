import React, { useContext, useReducer, useState, useEffect } from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { useHistory, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

//INTERNAL IMPORT
import Style from "./page.module.css";
import { SIGN_UP_URI } from "../constants/api";
import { LOG_IN_PATH } from "../constants/route";
import { PasswordInput } from "../components";
import { AuthContext } from "../context/AuthContext";

const SignUpPage = () => {
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
      await axios.post(SIGN_UP_URI, payload, { withCredentials: true });
      history.push("/");
    } catch (error) {
      const message = error.response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return (
    <Container className={Style.container}>
      <Typography variant="h5">회원가입</Typography>

      <Box
        component="form"
        className={Style.formContainer}
        onSubmit={handleSubmit}
      >
        <TextField
          required
          error={payloadValidity.userNameError}
          helperText={
            payloadValidity.userNameError ? "한글 또는 영어만 허용합니다." : ""
          }
          variant="standard"
          label="이름"
          name="userName"
          inputProps={{
            onBlur: () =>
              setPayloadValidity({
                type: "VALIDATE_USER_NAME",
                payload,
              }),
          }}
          onChange={(event) => setPayload({ type: event.target })}
        />

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
            onBlur: () =>
              setPayloadValidity({
                type: "VALIDATE_USER_ID",
                payload,
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

        <Button disabled={!isValid} type="submit">
          제출
        </Button>
      </Box>

      <Box component={Link} to={LOG_IN_PATH}>
        계정이 있으신가요?
      </Box>
    </Container>
  );
};

export default SignUpPage;

const initialState = {
  userName: "",
  userID: "",
  password: "",
};

const initialValidityState = {
  userNameError: null,
  userIDError: null,
  passwordError: null,
};
