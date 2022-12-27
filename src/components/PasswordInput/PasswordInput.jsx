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

const PasswordInput = ({
  payload,
  setPayload,
  setPayloadValidity,
  isError,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl required error={isError} variant="standard">
      <InputLabel>비밀번호</InputLabel>
      <Input
        type={showPassword ? "text" : "password"}
        name="password"
        inputProps={{
          onBlur: () =>
            setPayloadValidity({
              type: "VALIDATE_PASSWORD",
              value: payload.password,
            }),
        }}
        onChange={(event) => setPayload({ type: event.target })}
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
