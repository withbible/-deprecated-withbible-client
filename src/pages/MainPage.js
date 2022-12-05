import React from "react";
import { Typography } from "@mui/material";

//INTERNAL IMPORT
import Style from "./MainPage.module.css";
import Category from "../components/Category/Category";
import SearchBar from "../components/SearchBar/SearchBar";
import Wrapper from "../components/Wrapper/Wrapper";
import AppBar from "../components/AppBar/AppBar";

const MainPage = (_) => {
  return (
    <div className={Style.pageContainer}>
      <AppBar />

      <Typography>성경졸업고사 패스를 기원합니다!</Typography>

      <Wrapper>
        <SearchBar className={Style.searchBar} />

        <Category />
      </Wrapper>      
    </div>
  );
};

export default MainPage;
