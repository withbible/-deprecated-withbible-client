import React, { useEffect, useState } from "react";
import { Typography, Avatar } from "@mui/material";

//INTERNAL IMPORT
import Style from "./AppBar.module.css";

const AppBar = () => {
  const [userID, setUserID] = useState("");

  useEffect(() => {
    // TODO: 실제 인증 API 적용
    const timer = setTimeout(() => setUserID("yongki150"), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={Style.container}>
      <Avatar
        src={userID && `https://avatars.dicebear.com/api/micah/${userID}.svg`}
      />

      {userID ? (
        <Typography>{userID}님</Typography>
      ) : (
        <Typography>환영합니다</Typography>
      )}
    </div>
  )
};

export default AppBar;