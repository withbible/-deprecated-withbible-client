import React, { useState } from "react";
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
import Style from "./LogInPage.module.css";
import { LOG_IN_URI } from "../constants/api";
import { SIGN_UP_PATH } from "../constants/route";
import { PasswordInput } from "../components";

const LogInPage = () => {
  const [payload, setPayload] = useState({
    userID: "",
    password: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

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

  const handleChange = (prop) => (event) => {
    setPayload({ ...payload, [prop]: event.target.value });
  };

  return (
    <Container className={Style.authContainer}>
      <Typography variant="h5">로그인</Typography>

      <Box
        component="form"
        className={Style.formContainer}
        onSubmit={handleSubmit}
      >
        <TextField
          required
          autoFocus
          variant="standard"
          label="아이디"
          name="userID"
          value={payload.userID}
          onChange={handleChange("userID")}
        />

        <PasswordInput payload={payload} handleChange={handleChange} />

        {/* TODO: 세션 재발급으로 차후 구현 필요 */}
        <FormControlLabel
          name="isLogInCheck"
          control={<Checkbox defaultChecked />}
          label="자동로그인"
        />
        <Button type="submit">제출</Button>
      </Box>

      <Box component={Link} to={SIGN_UP_PATH}>
        계정이 없으신가요?
      </Box>
    </Container>
  );
};

export default LogInPage;
