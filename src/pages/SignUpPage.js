import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

//INTERNAL IMPORT
import Style from "./LogInPage.module.css";
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

  return (
    <Container className={Style.authContainer}>
      <Typography variant="h5">회원가입</Typography>

      <Box
        component="form"
        className={Style.formContainer}
        onSubmit={handleSubmit}
      >
        <TextField
          required
          autoFocus
          variant="standard"
          label="이름"
          name="userName"
          value={payload.userName}
          onChange={handleChange("userName")}
        />
        <TextField
          required
          variant="standard"
          label="아이디"
          name="userID"
          value={payload.userID}
          onChange={handleChange("userID")}
        />

        <PasswordInput payload={payload} handleChange={handleChange} />

        <Button type="submit">제출</Button>
      </Box>

      <Box>
        <Link href={LOG_IN_PATH}>계정이 있으신가요?</Link>
      </Box>
    </Container>
  );
};

export default SignUpPage;
