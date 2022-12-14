import React, { useContext } from "react";
import { List } from "@mui/material";

//INTERNAL IMPORT
import { Wrapper } from "../components";
import { ActiveChapterList } from "../components";
import { ChapterContext } from "../context/ChapterContext";
ChapterContext;

const ReviewListPage = () => {
  const { activeChapter } = useContext(ChapterContext);

  if (!activeChapter.length) {
    return <h3>데이터를 불러오는 중입니다...</h3>;
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
