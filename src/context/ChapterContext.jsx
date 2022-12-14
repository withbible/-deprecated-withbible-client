import React, { useState, useEffect, useCallback } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

//INTERNAL IMPORT
import {
  MAX_CHAPTER_URI,
  CHAPTER_SEARCH_URI,
  ACTIVE_CHAPTER_URI,
} from "../constants/api";

export const ChapterContext = React.createContext();

export const ChapterProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [maxChapter, setMaxChapter] = useState([]);
  const [chapterSearch, setChapterSearch] = useState([]);  
  const [activeChapter, setActiveChapter] = useState([]);
  const { enqueueSnackbar } = useSnackbar();  

  const fetchMaxChapter = useCallback(async () => {
    try {
      const { data } = await axios.get(MAX_CHAPTER_URI);      
      setMaxChapter(data.result);
    } catch (error) {
      const message = error.response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    }
  }, []);

  const fetchChapterSearch = async (searchKeyword) => {
    setSearchKeyword(searchKeyword);

    try {
      const { data } = await axios.get(
        `${CHAPTER_SEARCH_URI}?keyword=${searchKeyword}`
      );
      setChapterSearch(data.result);
    } catch (error) {
      const message = error.response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  // TODO: 메인페이지와 리뷰목록페이지를 구분짓는 매개체가 필요
  const fetchActiveChapter = async () => {
    try {
      const { data } = await axios.get(ACTIVE_CHAPTER_URI);
      setActiveChapter(data.result);
    } catch (error) {
      const message = error.response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchActiveChapter();
  }, []);

  return (
    <ChapterContext.Provider
      value={{
        fetchMaxChapter,
        fetchChapterSearch,        
        searchKeyword,
        setSearchKeyword,       
        maxChapter, 
        chapterSearch,
        activeChapter,
      }}
    >
      {children}
    </ChapterContext.Provider>
  );
};
