import React, { useEffect, useState } from "react";
import { Typography, Avatar } from "@mui/material";

//INTERNAL IMPORT
import Style from "./MainPage.module.css";
import Category from "../components/Category/Category";
import SearchBar from "../components/SearchBar/SearchBar";

const MainPage = (_) => {
  const [userID, setUserID] = useState("");

  useEffect(() => {
    // TODO: 실제 인증 API 적용
    const timer = setTimeout(() => setUserID("yongki150"), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={Style.pageContainer}>
      <Avatar
        src={userID && `https://avatars.dicebear.com/api/micah/${userID}.svg`}
      />

      {userID ? (
        <Typography>{userID}님</Typography>
      ) : (
        <Typography>환영합니다</Typography>
      )}

      <Typography>성경졸업고사 패스를 기원합니다!</Typography>

      <div className={Style.bodyContainer}>
        <SearchBar className={Style.searchBarComponent}/>

        <Category />
      </div>
    </div>
  );
};

export default MainPage;
