import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { List, ListSubheader } from "@mui/material";

// INTERNAL IMPORT
import { Wrapper, ActiveChapterList } from "../components";
import { CATEGORY } from "../constants/enum";
import { ACTIVE_CHAPTER_PAGE_PATH } from "../constants/api";
import { AUTH_HEADER_CONFIG } from "../constants/config";
import NotFoundPage from "./NotFoundPage";

// CONSTANT
const LIST_ITEM_HEIGHT = 64;

// HELPER FUNCTION
function mergeWithCategory(arr) {
  const result = [];

  arr.forEach((each) => {
    const index = result.findIndex(
      (exist) => exist.categorySeq === each.categorySeq
    );

    if (index > -1) {
      result[index].chapterNumArray = result[index].chapterNumArray.concat(
        each.chapterDetail
      );
    } else {
      result.push({
        categorySeq: each.categorySeq,
        chapterNumArray: [each.chapterDetail],
      });
    }
  });

  return result;
}

// MAIN
function ReviewListPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const limit = Math.round(window.innerHeight / LIST_ITEM_HEIGHT);
  const [activeChapter, setActiveChapter] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const page = useRef(1);
  const observerTarget = useRef(null);

  const fetchActiveChapter = useCallback(async () => {
    setErrorMessage("");

    try {
      const path = `${ACTIVE_CHAPTER_PAGE_PATH}?limit=${limit}&page=${page.current}`;
      const { data } = await axios.get(path, AUTH_HEADER_CONFIG);

      setActiveChapter((prevState) => [
        ...prevState,
        ...mergeWithCategory(data.result),
      ]);

      if (data.meta.links.at(-1).link === path) {
        setHasNextPage(false);
      } else {
        setHasNextPage(true);
        page.current += 1;
      }
    } catch (error) {
      const { message } = error.response?.data || error;
      setErrorMessage(message);
    }
  }, [page.current]);

  useEffect(() => {
    if (!observerTarget.current || !hasNextPage) {
      return false;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchActiveChapter();
      }
    });

    observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [hasNextPage]);

  if (errorMessage) {
    return <NotFoundPage title="리뷰목록" message={errorMessage} />;
  }

  return (
    <Wrapper>
      <Wrapper.Header>리뷰목록</Wrapper.Header>
      <Wrapper.Body>
        <List>
          {activeChapter.map((each) => (
            <div key={each.categorySeq}>
              <ListSubheader>{CATEGORY[each.categorySeq]}</ListSubheader>

              <ActiveChapterList
                iteratee={each.chapterNumArray}
                categorySeq={each.categorySeq}
              />
            </div>
          ))}
          <div ref={observerTarget} />
        </List>
      </Wrapper.Body>
    </Wrapper>
  );
}

export default ReviewListPage;
