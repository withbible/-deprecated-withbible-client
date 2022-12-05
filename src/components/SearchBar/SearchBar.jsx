import React, { useContext, useState } from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

//INTERNAL IMPORT
import Style from "./SearchBar.module.css";
import { ChapterSearchContext } from "../../context/ChapterSearchContext";

const SearchBar = ({ className }) => {
  const { fetchChapterSearch } = useContext(ChapterSearchContext);
  const [searchKeyword, setSearchKeyword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    fetchChapterSearch(searchKeyword);
  };

  return (
    <form onSubmit={onSubmit} className={className}>
      <div className={Style.searchBarContainer}>
        <SearchIcon className={Style.searchBarIcon} />
        <input
          placeholder="검색어를 입력하세요."
          onChange={(e) => setSearchKeyword(e.target.value)}
          value={searchKeyword}
        />

        <IconButton type="submit">
          <KeyboardArrowRightIcon />
        </IconButton>
      </div>
    </form>
  );
};

export default SearchBar;
