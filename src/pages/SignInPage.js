import React from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

//INTERNAL IMPORT
import Style from "./SignInPage.module.css";

const SignInPage = () => {
  return (
    <Container className={Style.authContainer}>
      <Typography variant="h5">로그인</Typography>

      <Box component="form" className={Style.formContainer}>
        <TextField required focused variant="standard" label="아이디"/>
        <TextField required focused variant="standard" label="비밀번호" />

        <FormControlLabel control={<Checkbox />} label="자동로그인" />
      </Box>

      <Button type="submit">로그인</Button>
    </Container>
  );
};

export default SignInPage;
