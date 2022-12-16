import React, { useContext, useEffect, useRef } from "react";

//INTERNAL IMPORT
import { AppBar, Category, SearchBar, Wrapper } from "../components";
import { ChapterContext } from "../context/ChapterContext";

const MainPage = (_) => {
  const { fetchChapterSearch, fetchActiveChapter, searchKeyword } =
    useContext(ChapterContext);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if(isFirstRender.current){
      fetchChapterSearch(searchKeyword);
      
      isFirstRender.current = false;
      return;
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
};

export default MainPage;
