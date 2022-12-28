import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { List, Typography } from "@mui/material";

// INTERNAL IMPORT
import { Wrapper, ActiveChapterList } from "../components";
import { ACTIVE_CHAPTER_PAGE_URI } from "../constants/api";
import { AUTH_HEADER_CONFIG } from "../constants/config";

// CONSTANT
const LIST_ITEM_HEIGHT = 64;

// HELPER FUNCTION
function mergeWithCategory(arr) {
  const result = [];

  arr.forEach((each) => {
    const index = result.findIndex((exist) => {
      return exist.category === each.category;
    });

    if (index > -1) {
      result[index].chapter_detail = result[index].chapter_detail.concat(
        each.chapter_detail
      );
    } else {
      const newObj = {};
      newObj.chapter_detail = [each.chapter_detail];
      result.push(newObj);
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
  const { enqueueSnackbar } = useSnackbar();

  const fetchActiveChapter = useCallback(async () => {
    try {
      const queryParameter = `?limit=${limit}&page=${page.current}`;
      const { data } = await axios.get(
        `${ACTIVE_CHAPTER_PAGE_URI}${queryParameter}`,
        AUTH_HEADER_CONFIG
      );

      setActiveChapter((prevState) => [
        ...prevState,
        ...mergeWithCategory(data.result),
      ]);

      // TODO: 마지막 응답 데이터는 충족하되 다음 data는 없다면
      setHasNextPage(data.result.length === limit);

      if (data.result.length) {
        page.current += 1;
      }
    } catch (error) {
      const { message } = error.response.data;

      if (error.response.status === 401) {
        setErrorMessage(message);
        return;
      }

      enqueueSnackbar(message, { variant: "error" });
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

  return (
    <Wrapper>
      리뷰목록
      <Wrapper.Body>
        {errorMessage ? (
          <Typography variant="h4">{errorMessage}</Typography>
        ) : (
          <List>
            {activeChapter.map((each, index) => (
              <ActiveChapterList
                key={index}
                iteratee={each.chapter_detail}
                category={each.category}
                categorySeq={each.category_seq}
              />
            ))}
            <div ref={observerTarget} />
          </List>
        )}
      </Wrapper.Body>
    </Wrapper>
  );
}

export default ReviewListPage;
