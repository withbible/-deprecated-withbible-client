import React, { useState, useContext } from "react";
import {
  IconButton,
  InputBase,
  InputAdornment,
  Paper,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// INTERNAL IMPORT
import Style from "./SearchBar.module.css";
import { ChapterContext } from "../../contexts/ChapterContext";

function SearchBar() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const { fetchChapterSearch } = useContext(ChapterContext);

  const hanldeSubmit = async (event) => {
    event.preventDefault();

    fetchChapterSearch(searchInputValue);
  };

  return (
    <Box component="form" onSubmit={hanldeSubmit}>
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
          placeholder="검색어를 입력하세요."
          onChange={(event) => setSearchInputValue(event.target.value)}
          value={searchInputValue}
        />
      </Paper>
    </Box>
  );
}

export default SearchBar;
