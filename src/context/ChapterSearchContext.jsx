import React, { useState } from "react";
import axios from "axios";

export const ChapterSearchContext = React.createContext();

export const ChapterSearchProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchRecord, setSearchRecord] = useState([]);

  const fetchChapter = async () => {
    try {
      const uri = `/quiz/category/max-chapter`;
      return await axios.get(uri);

    } catch (error) {}
  };

  const fetchChapterSearch = async (searchKeyword) => {
    setSearchKeyword(searchKeyword);

    try {
      const uri = `/quiz/categories/chapter?keyword=${searchKeyword}`;
      return await axios.get(uri);

    } catch (error) {}
  };

  return (
    <ChapterSearchContext.Provider
      value={{
        fetchChapter,
        fetchChapterSearch,
        searchRecord,
        setSearchRecord,
        searchKeyword
      }}
    >
      {children}
    </ChapterSearchContext.Provider>
  );
};
