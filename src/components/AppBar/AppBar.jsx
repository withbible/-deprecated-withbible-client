import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import {
  Typography,
  Avatar,
  Box,
  Button,
  Paper,
  IconButton,
  Modal,
  Divider,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

// INTERNAL IMPORT
import Style from "./AppBar.module.css";
import { LOGOUT_PATH } from "../../constants/api";
import { ADMIN_USER_ID, AUTH_HEADER_CONFIG } from "../../constants/config";
import { LOGIN_PATH } from "../../constants/route";
import { AuthContext } from "../../contexts/AuthContext";
import { ChapterContext } from "../../contexts/ChapterContext";

function AppBar() {
  const [open, setOpen] = useState(false);
  const { userID, setUserID } = useContext(AuthContext);
  const { setActiveChapter } = useContext(ChapterContext);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleClick = async () => {
    try {
      await axios({
        method: "patch",
        url: LOGOUT_PATH,
        ...AUTH_HEADER_CONFIG,
      });

      setUserID("");
      setActiveChapter([]);
      history.push(LOGIN_PATH);
    } catch (error) {
      const { message } = error.response?.data || error;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  if (userID) {
    return (
      <>
        <Avatar src={`https://avatars.dicebear.com/api/micah/${userID}.svg`} />

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            {userID}님{userID === ADMIN_USER_ID ? "(관리자)" : null}
          </Typography>

          <Typography>성경졸업고사 패스를 기원합니다!</Typography>
        </Box>

        <Box className={Style.rightSideButtonContainer}>
          <IconButton onClick={handleOpen}>
            <HelpIcon />
          </IconButton>

          <Modal open={open} onClose={handleClose}>
            <Box className={Style.modal}>
              <Typography variant="h5">FAQ</Typography>

              <Typography>Q.</Typography>
              <Divider variant="fullWidth" />
              <Typography variant="subtitle2" color="text.secondary">
                A.
              </Typography>
            </Box>
          </Modal>

          <Button onClick={handleClick}>
            <Paper className={Style.authButton} elevation={3}>
              로그아웃
            </Paper>
          </Button>
        </Box>
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

      <Box className={Style.rightSideButtonContainer}>
        <Button component={Link} to={LOGIN_PATH}>
          <Paper className={Style.authButton} elevation={3}>
            로그인
          </Paper>
        </Button>
      </Box>
    </>
  );
}

export default AppBar;
