import React, { useContext, useEffect, useRef } from "react";

// INTERNAL IMPORT
import {
  AppBar,
  AdvertisingBanner,
  Category,
  SearchBar,
  Wrapper,
} from "../components";
import { ChapterContext } from "../contexts/ChapterContext";

function MainPage() {
  const { fetchChapterSearch, searchKeyword } = useContext(ChapterContext);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      fetchChapterSearch(searchKeyword);

      isFirstRender.current = false;
    }
  }, [searchKeyword]);

  return (
    <Wrapper>
      <Wrapper.Header>
        <AppBar />
      </Wrapper.Header>

      <Wrapper.Body>
        <AdvertisingBanner />
        <SearchBar />
        <Category />
      </Wrapper.Body>
    </Wrapper>
  );
}

export default MainPage;
