import React, { useContext, useEffect } from "react";
import { List } from "@mui/material";

//INTERNAL IMPORT
import { Wrapper } from "../components";
import { ActiveChapterList } from "../components";
import { ChapterContext } from "../context/ChapterContext";
ChapterContext;
import NotFoundPage from "./NotFoundPage";

const ReviewListPage = () => {
  const { fetchActiveChapter, activeChapter } = useContext(ChapterContext);

  useEffect(() => {
    fetchActiveChapter();
  }, []);

  if (!activeChapter.length) {
    return (
      <NotFoundPage title="리뷰목록" message="데이터를 불러오는 중입니다..." />
    );
  }

  return (
    <Wrapper>
      리뷰목록
      <Wrapper.Body>
        <List>
          {activeChapter.map((each, index) => (
            <ActiveChapterList
              key={index}
              iteratee={each["chapter_num_array"]}
              category={each["category"]}
              categorySeq={each["category_seq"]}
            />
          ))}
        </List>
      </Wrapper.Body>
    </Wrapper>
  );
};

export default ReviewListPage;
