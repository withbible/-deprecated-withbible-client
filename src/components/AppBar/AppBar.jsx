import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Typography, Avatar, Box, Button, Paper } from "@mui/material";

// INTERNAL IMPORT
import Style from "./AppBar.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { ChapterContext } from "../../contexts/ChapterContext";
import { LOGIN_PATH } from "../../constants/route";
import { LOGOUT_URI } from "../../constants/api";
import { AUTH_HEADER_CONFIG } from "../../constants/config";

function AppBar() {
  const { userID, setUserID } = useContext(AuthContext);
  const { setActiveChapter } = useContext(ChapterContext);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handleClick = async () => {
    try {
      await axios({
        method: "patch",
        url: LOGOUT_URI,
        ...AUTH_HEADER_CONFIG,
      });

      setUserID("");
      setActiveChapter([]);
      history.push(LOGIN_PATH);
    } catch (error) {
      const { message } = error.response.data;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  if (userID) {
    return (
      <>
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
      </>
    );
  }

  return (
    <>
      <Avatar />

      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          환영합니다
        </Typography>

        <Typography>성경졸업고사 패스를 기원합니다!</Typography>
      </Box>

      <Button className={Style.authButton} component={Link} to={LOGIN_PATH}>
        <Paper elevation={3}>로그인</Paper>
      </Button>
    </>
  );
}

export default AppBar;
