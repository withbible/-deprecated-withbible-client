import React, { useState, useMemo } from "react";
import axios from "axios";

// INTERNAL IMPORT
import { CHAPTER_SEARCH_URI, ACTIVE_CHAPTER_URI } from "../constants/api";
import { AUTH_HEADER_CONFIG } from "../constants/config";

// MAIN
export const ChapterContext = React.createContext();

export function ChapterProvider({ children }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [chapterSearch, setChapterSearch] = useState([]);
  const [activeChapter, setActiveChapter] = useState([]);

  const fetchChapterSearch = async (keyword) => {
    setSearchKeyword(keyword);
    setErrorMessage("");

    try {
      const { data } = await axios.get(
        `${CHAPTER_SEARCH_URI}?keyword=${keyword}`
      );

      setChapterSearch(data.result);
    } catch (error) {
      const { message } = error.response?.data || error;
      setErrorMessage(message);
    }
  };

  const fetchActiveChapter = async () => {
    const { data } = await axios.get(ACTIVE_CHAPTER_URI, AUTH_HEADER_CONFIG);
    setActiveChapter(data.result);
  };

  const props = useMemo(
    () => ({
      chapterSearch,
      fetchChapterSearch,
      searchKeyword,
      setSearchKeyword,
      activeChapter,
      setActiveChapter,
      fetchActiveChapter,
      errorMessage,
    }),
    [chapterSearch, searchKeyword, activeChapter, errorMessage]
  );

  return (
    <ChapterContext.Provider value={props}>{children}</ChapterContext.Provider>
  );
}
