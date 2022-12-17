import React, { useState } from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { useHistory, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

//INTERNAL IMPORT
import Style from "./page.module.css";
import { SIGN_UP_URI } from "../constants/api";
import { LOG_IN_PATH } from "../constants/route";
import { PasswordInput } from "../components";

const SignUpPage = () => {
  const [payload, setPayload] = useState({
    userName: "",
    userID: "",
    password: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(SIGN_UP_URI, payload);
      history.push("/");
    } catch (error) {
      const message = error.response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  const handleChange = (prop) => (event) => {
    setPayload({ ...payload, [prop]: event.target.value });
  };

  const isUserNameError =
    payload.userName.length &&
    !payload.userName.match(/^[ㄱ-ㅎ가-힇A-Z-a-z]+$/);
  const isUserIDError =
    payload.userID.length && !payload.userID.match(/^[a-zA-Z0-9]+$/);

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
          autoFocus
          error={isUserNameError}
          helperText={isUserNameError ? "한글 또는 영어만 허용합니다." : ""}
          variant="standard"
          label="이름"
          name="userName"
          value={payload.userName}
          onChange={handleChange("userName")}
        />
        <TextField
          required
          error={isUserIDError}
          helperText={isUserIDError ? "숫자와 문자 조합만 허용합니다." : ""}
          variant="standard"
          label="아이디"
          name="userID"
          value={payload.userID}
          onChange={handleChange("userID")}
        />

        <PasswordInput payload={payload} handleChange={handleChange} />

        <Button type="submit">제출</Button>
      </Box>

      <Box component={Link} to={LOG_IN_PATH}>
        계정이 있으신가요?
      </Box>
    </Container>
  );
};

export default SignUpPage;
