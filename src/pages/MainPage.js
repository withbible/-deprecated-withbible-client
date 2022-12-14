import React, { useContext, useEffect } from "react";
import { Typography } from "@mui/material";

//INTERNAL IMPORT
import { AppBar, Category, SearchBar, Wrapper } from "../components";
import { ChapterContext } from "../context/ChapterContext";
import { AuthContext } from "../context/AuthContext";
ChapterContext;
AuthContext

const MainPage = (_) => {
  const { fetchChapterSearch, chapterSearch } = useContext(ChapterContext);
  const { fetchLoginCheck, userID } = useContext(AuthContext);

  useEffect(() => {
    fetchChapterSearch("");
  }, []);

  // TODO: 로그인 페이지에서 넘어올시, 하단바에서 넘어올시 재호출 방지
  useEffect(() => {
    fetchLoginCheck();
  }, [userID]);

  if (!chapterSearch.length) {
    return (
      <Wrapper>
        <Wrapper.Header>
          <AppBar />
        </Wrapper.Header>
        <Wrapper.Body>
          <Typography variant="h4">데이터를 불러오는 중입니다...</Typography>
        </Wrapper.Body>
      </Wrapper>
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
