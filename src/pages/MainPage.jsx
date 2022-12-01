import React from "react";
import { Typography } from "@mui/material";
import Category from "../components/Category/Category";
import SearchBar from "../components/SearchBar/SearchBar";

const MainPage = (_) => {
  return (
    <>
      <Typography>
        Hey yongki150, what subject you want to improve today?
      </Typography>

      <SearchBar />

      <Category />
    </>
  );
};

export default MainPage;
