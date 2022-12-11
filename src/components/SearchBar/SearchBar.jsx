import React, { useContext, useState } from "react";
import {
  IconButton,
  InputBase,
  InputAdornment,
  Paper,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

//INTERNAL IMPORT
import Style from "./SearchBar.module.css";
import { ChapterSearchContext } from "../../context/ChapterSearchContext";

const SearchBar = () => {
  const { fetchChapterSearch } = useContext(ChapterSearchContext);
  const [searchKeyword, setSearchKeyword] = useState("");

  const hanldeSubmit = async (event) => {
    event.preventDefault();

    fetchChapterSearch(searchKeyword);
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
          onChange={(event) => setSearchKeyword(event.target.value)}
          value={searchKeyword}
        />
      </Paper>
    </Box>
  );
};

export default SearchBar;
