import React, { useContext, useEffect, useRef } from "react";

// INTERNAL IMPORT
import Style from "./page.module.css";
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

  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <Wrapper>
      <Wrapper.Header>
        <AppBar />
      </Wrapper.Header>

      <Wrapper.Body>
        <ins
          className={`adsbygoogle ${Style.ads}`}
          data-ad-client="ca-pub-1919598055512436"
          data-ad-slot="1678485541"
        />

        <SearchBar />
        <Category />
      </Wrapper.Body>
    </Wrapper>
  );
}

export default MainPage;
