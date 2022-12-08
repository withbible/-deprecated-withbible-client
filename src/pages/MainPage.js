import React from "react";
import { Typography } from "@mui/material";

//INTERNAL IMPORT
import Style from "./MainPage.module.css";
import { AppBar, Category, SearchBar, Wrapper } from "../components";

const MainPage = (_) => {
  return (
    <Wrapper>
      <Wrapper.Header>
        <AppBar />

        <Typography>성경졸업고사 패스를 기원합니다!</Typography>
      </Wrapper.Header>

      <Wrapper.Body>
        <SearchBar className={Style.searchBar} />

        <Category />
      </Wrapper.Body>
    </Wrapper>
  );
};

export default MainPage;
