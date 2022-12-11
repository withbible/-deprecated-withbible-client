import React, { useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

//INTERNAL IMPORT
import { MAX_CHAPTER_URI, CHAPTER_SEARCH_URI } from "../constants/api";

export const ChapterSearchContext = React.createContext();

export const ChapterSearchProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchRecord, setSearchRecord] = useState({
    maxChapter: [],
    chapterSearch: [],
  });
  const { enqueueSnackbar } = useSnackbar();

  const fetchMaxChapter = async () => {
    try {
      const { data } = await axios.get(`${MAX_CHAPTER_URI}`);

      setSearchRecord({ ...searchRecord, maxChapter: data.result });
    } catch (error) {
      const message = error.response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  const fetchChapterSearch = async (searchKeyword) => {
    setSearchKeyword(searchKeyword);

    try {
      const { data } = await axios.get(
        `${CHAPTER_SEARCH_URI}?keyword=${searchKeyword}`
      );

      setSearchRecord({ ...searchRecord, chapterSearch: data.result });
    } catch (error) {
      const message = error.response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return (
    <ChapterSearchContext.Provider
      value={{
        fetchMaxChapter,
        fetchChapterSearch,
        searchRecord,
        searchKeyword,
      }}
    >
      {children}
    </ChapterSearchContext.Provider>
  );
};
