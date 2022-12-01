import React from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

//INTERNAL IMPORT
import Style from "./SearchBar.module.css";

const SearchBar = () => {
  return (    
    <div className={Style.searchBarContainer}>
      <SearchIcon className={Style.searchBarIcon}/>

      <input placeholder="검색어를 입력하세요." />

      <IconButton type="submit">
        <KeyboardArrowRightIcon />
      </IconButton>      
    </div>
  );
};

export default SearchBar;
