import React, { useState, useEffect, useRef } from "react";
import { List } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";

//INTERNAL IMPORT
import { Wrapper, ActiveChapterList } from "../components";
import { ACTIVE_CHAPTER_PAGE_URI } from "../constants/api";

const LIMIT = 7;

const ReviewListPage = () => {
  const [activeChapter, setActiveChapter] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const page = useRef(1);
  const observerTarget = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const fetchActiveChapter = async () => {
    try {
      const queryParameter = `?limit=${LIMIT}&page=${page.current}`;
      const { data } = await axios.get(
        `${ACTIVE_CHAPTER_PAGE_URI}${queryParameter}`
      );

      setActiveChapter((prevState) => [
        ...prevState,
        ...mergeWithCategory(data.result),
      ]);

      setHasNextPage(data.result.length === LIMIT);

      if (data.result.length) {
        page.current += 1;
      }
    } catch (error) {
      const message = error.response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  useEffect(() => {
    if (!observerTarget.current || !hasNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchActiveChapter();
      }
    });

    observer.observe(observerTarget.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage]);

  return (
    <Wrapper>
      리뷰목록
      <Wrapper.Body>
        <List>
          {activeChapter?.map((each, index) => (
            <ActiveChapterList
              key={index}
              iteratee={each["chapter_detail"]}
              category={each["category"]}
              categorySeq={each["category_seq"]}
            />
          ))}
          <div ref={observerTarget} />
        </List>
      </Wrapper.Body>
    </Wrapper>
  );
};

export default ReviewListPage;

function mergeWithCategory(arr) {
  const result = [];

  arr.forEach(function (each) {
    const index = result.findIndex(function (exist) {
      return exist.category === each.category;
    });

    if (index > -1) {
      result[index]["chapter_detail"] = result[index]["chapter_detail"].concat(
        each["chapter_detail"]
      );
    } else {
      each["chapter_detail"] = [each["chapter_detail"]];
      result.push(each);
    }
  });

  return result;
}
