import React, { useContext, useEffect, useRef } from "react";

// INTERNAL IMPORT
import { AppBar, Category, SearchBar, Wrapper } from "../components";
import { ChapterContext } from "../contexts/ChapterContext";

function MainPage() {
  const { fetchChapterSearch, searchKeyword, fetchActiveChapter } =
    useContext(ChapterContext);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      fetchChapterSearch(searchKeyword);

      isFirstRender.current = false;
    }
  }, [searchKeyword]);

  useEffect(() => {
    fetchActiveChapter();
  }, []);

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
}

export default MainPage;
