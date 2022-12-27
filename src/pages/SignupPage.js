import React, { useContext, useReducer, useState, useEffect } from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { useHistory, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

//INTERNAL IMPORT
import Style from "./page.module.css";
import { SIGNUP_URI } from "../constants/api";
import { LOGIN_PATH } from "../constants/route";
import { PasswordInput } from "../components";
import { AuthContext } from "../context/AuthContext";
import { AUTH_HEADER_CONFIG } from "../constants/config";

const SignupPage = () => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios({
        method: "post",
        url: SIGNUP_URI,
        auth: {
          /**
           * 본 서비스에서 사용되는
           * userID(사용자ID)는 고유성을 가지는 필드이다.
           * userName(사용자이름)은 중복될 수 있는 필드이다.
           *
           * 보안성을 고려하여 userID 필드가 username 키에 들어가는 것이 맞다고 판단한다.
           */
          username: payload.userID,
          password: payload.password,
        },
        data: {
          userName: payload.userName,
        },
        ...AUTH_HEADER_CONFIG,
      });
      setUserID(data.result["userID"]);
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
            payloadValidity.userNameError && "한글 또는 영어만 허용합니다."
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
            payloadValidity.userIDError && "숫자와 문자 조합만 허용합니다."
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

      <Box component={Link} to={LOGIN_PATH}>
        계정이 있으신가요?
      </Box>
    </Container>
  );
};

export default SignupPage;

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