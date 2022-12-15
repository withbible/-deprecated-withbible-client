import React, { useContext, useEffect } from "react";

//INTERNAL IMPORT
import { AppBar, Category, SearchBar, Wrapper } from "../components";
import { ChapterContext } from "../context/ChapterContext";
import NotFoundPage from "./NotFoundPage";

const MainPage = (_) => {
  const {
    fetchChapterSearch,
    chapterSearch,
    fetchActiveChapter,    
  } = useContext(ChapterContext);

  useEffect(() => {
    fetchChapterSearch("");
  }, []);

  useEffect(() => {
    fetchActiveChapter();
  }, []);

  if (!chapterSearch.length) {
    return (
      <NotFoundPage
        title={<AppBar />}
        message="데이터를 불러오는 중입니다..."
      />
    );
  }

  return (
    <Wrapper>
      <Wrapper.Header>
        <AppBar />
      </Wrapper.Header>

      <Wrapper.Body>
        <SearchBar />
        <Category />
      </Wrapper.Body>
    </Wrapper>
  );
};

export default MainPage;
