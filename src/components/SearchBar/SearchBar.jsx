import React, { useContext, useState } from "react";
import { IconButton, InputBase, InputAdornment, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

//INTERNAL IMPORT
import Style from "./SearchBar.module.css";
import { ChapterSearchContext } from "../../context/ChapterSearchContext";

const SearchBar = () => {
  const { fetchChapterSearch } = useContext(ChapterSearchContext);
  const [searchKeyword, setSearchKeyword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    fetchChapterSearch(searchKeyword);
  };

  return (
    <form onSubmit={onSubmit}>
      <Paper className={Style.searchBarContainer}>
        <InputBase
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end" className={Style.searchButton}>
              <IconButton type="submit">
                <KeyboardArrowRightIcon />
              </IconButton>
            </InputAdornment>
          }
          className={Style.searchBar}
          // TODO: placeholder 커스텀 필요
          placeholder="검색어를 입력하세요."
          onChange={(e) => setSearchKeyword(e.target.value)}
          value={searchKeyword}
        />
      </Paper>
    </form>
  );
};

export default SearchBar;
