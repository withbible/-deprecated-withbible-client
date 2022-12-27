import React, { useState } from "react";
import axios from "axios";

//INTERNAL IMPORT
import { CHAPTER_SEARCH_URI, ACTIVE_CHAPTER_URI } from "../constants/api";
import { AUTH_HEADER_CONFIG } from "../constants/config";

export const ChapterContext = React.createContext();

export const ChapterProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [chapterSearch, setChapterSearch] = useState([]);
  const [activeChapter, setActiveChapter] = useState([]);

  const fetchChapterSearch = async (searchKeyword) => {
    setSearchKeyword(searchKeyword);
    setError("");

    try {
      const { data } = await axios.get(
        `${CHAPTER_SEARCH_URI}?keyword=${searchKeyword}`
      );
      setChapterSearch(data.result);
    } catch (error) {
      const message = error.response.data.message;
      setError(message);
    }
  };

  const fetchActiveChapter = async () => {
    try {
      const { data } = await axios.get(ACTIVE_CHAPTER_URI, AUTH_HEADER_CONFIG);
      setActiveChapter(data.result);
    } catch (error) {}
  };

  return (
    <ChapterContext.Provider
      value={{
        chapterSearch,
        fetchChapterSearch,
        searchKeyword,
        setSearchKeyword,
        activeChapter,
        setActiveChapter,
        fetchActiveChapter,
        error,
      }}
    >
      {children}
    </ChapterContext.Provider>
  );
};
