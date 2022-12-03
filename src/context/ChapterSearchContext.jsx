import React, { useState } from "react";
import axios from "axios";

export const ChapterSearchContext = React.createContext();

export const ChapterSearchProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchRecord, setSearchRecord] = useState({
    maxChapter: [],
    chapterSearch: [],
  });

  const fetchMaxChapter = async () => {
    try {
      const uri = `/quiz/category/max-chapter`;
      const { data } = await axios.get(uri);

      setSearchRecord((prevState) => {
        return { ...prevState, maxChapter: data.result };
      });
    } catch (error) {}
  };

  const fetchChapterSearch = async (searchKeyword) => {
    setSearchKeyword(searchKeyword);

    try {
      const uri = `/quiz/categories/chapter?keyword=${searchKeyword}`;
      const { data } = await axios.get(uri);

      setSearchRecord((prevState) => {
        return { ...prevState, chapterSearch: data.result };
      });
      setError("");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <ChapterSearchContext.Provider
      value={{
        error,
        fetchMaxChapter,
        fetchChapterSearch,
        searchRecord,
        setSearchRecord,
        searchKeyword,
      }}
    >
      {children}
    </ChapterSearchContext.Provider>
  );
};
