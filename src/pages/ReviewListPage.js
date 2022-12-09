import React, { useState, useEffect } from "react";
import { List } from "@mui/material";
import axios from "axios";

//INTERNAL IMPORT
import { Wrapper } from "../components";
import { ACTIVE_CHAPTER_URI } from "../constants/api";
import { ActiveChapterList } from "../components";

const ReviewListPage = () => {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    axios
      .get(ACTIVE_CHAPTER_URI)
      .then(({ data }) => setReviewList(data.result));
  }, []);

  if (!reviewList.length) {
    return <h3>데이터를 불러오는 중입니다...</h3>;
  }

  return (
    <Wrapper>
      리뷰목록
      <Wrapper.Body>
        <List>
          {reviewList.map((each, index) => (
            <ActiveChapterList
              key={index}
              iteratee={each["chapter_seq_array"]}
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
