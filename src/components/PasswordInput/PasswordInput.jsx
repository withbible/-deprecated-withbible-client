import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordInput = ({ payload, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isError = payload.password.length < 6 && payload.password.length > 0;

  return (
    <FormControl required error={isError} variant="standard">
      <InputLabel>비밀번호</InputLabel>
      <Input
        type={showPassword ? "text" : "password"}
        name="password"
        value={payload.password}
        onChange={handleChange("password")}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText hidden={!isError} error={isError}>
        6자 이상 입력해주세요.
      </FormHelperText>
    </FormControl>
  );
};

export default PasswordInput;
