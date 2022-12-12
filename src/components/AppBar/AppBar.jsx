import React, { useContext } from "react";
import { Typography, Avatar, Box } from "@mui/material";

//INTERNAL IMPORT
import Style from "./AppBar.module.css";
import { AuthContext } from "../../context/AuthContext";

const AppBar = () => {
  const { userID } = useContext(AuthContext);

  return (
    <div className={Style.container}>
      <Avatar
        src={userID && `https://avatars.dicebear.com/api/micah/${userID}.svg`}
      />

      <Box>
        {userID ? (
          <Typography variant="subtitle2" color="text.secondary">
            {userID}님
          </Typography>
        ) : (
          <Typography variant="subtitle2" color="text.secondary">
            환영합니다
          </Typography>
        )}

        <Typography>성경졸업고사 패스를 기원합니다!</Typography>
      </Box>
    </div>
  );
};

export default AppBar;
