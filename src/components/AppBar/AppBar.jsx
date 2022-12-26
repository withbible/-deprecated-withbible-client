import React, { useContext } from "react";
import { Typography, Avatar, Box, Button, Paper } from "@mui/material";
import { useHistory, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

//INTERNAL IMPORT
import Style from "./AppBar.module.css";
import { AuthContext } from "../../context/AuthContext";
import { LOG_IN_PATH } from "../../constants/route";
import { LOG_OUT_URI } from "../../constants/api";

const AppBar = () => {
  const { userID, setUserID } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handleClick = async () => {
    try {
      await axios.patch(LOG_OUT_URI, {
        withCredentials: true,
      });
      setUserID("");
      history.push(LOG_IN_PATH);
    } catch (error) {
      const message = error.response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  if (userID) {
    return (
      <div className={Style.container}>
        <Avatar src={`https://avatars.dicebear.com/api/micah/${userID}.svg`} />

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            {userID}님
          </Typography>

          <Typography>성경졸업고사 패스를 기원합니다!</Typography>
        </Box>

        <Button className={Style.authButton} onClick={handleClick}>
          <Paper elevation={3}>로그아웃</Paper>
        </Button>
      </div>
    );
  }

  return (
    <div className={Style.container}>
      <Avatar />

      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          환영합니다
        </Typography>

        <Typography>성경졸업고사 패스를 기원합니다!</Typography>
      </Box>

      <Button className={Style.authButton} component={Link} to={LOG_IN_PATH}>
        <Paper elevation={3}>로그인</Paper>
      </Button>
    </div>
  );
};

export default AppBar;
