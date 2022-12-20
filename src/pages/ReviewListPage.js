import React, { useState, useEffect, useRef } from "react";
import { List } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";

//INTERNAL IMPORT
import { Wrapper, ActiveChapterList } from "../components";
import { ACTIVE_CHAPTER_URI } from "../constants/api";

const ReviewListPage = () => {
  const [activeCategory, setActiveCategory] = useState([]);
  const [activeChapter, setActiveChapter] = useState([]);
  const [hasNextCategory, setHasNextCategory] = useState(true);
  const activeCategoryIndex = useRef(0);
  const observerTarget = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const fetchActiveCategory = async () => {
    try {
      const { data } = await axios.get("/history/categories/active");

      setActiveCategory(data.result);
    } catch (error) {
      const message = error.response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  const fetchActiveChapter = async () => {
    let isNext;

    try {
      const categorySeq =
        activeCategory[activeCategoryIndex.current]["category_seq"];
      const queryParameter = `?categorySeq=${categorySeq}`;

      const { data } = await axios.get(
        `${ACTIVE_CHAPTER_URI}${queryParameter}`
      );

      isNext = activeCategoryIndex.current < activeCategory.length - 1;

      setActiveChapter((prevState) => [...prevState, ...data.result]);
      setHasNextCategory(isNext);
    } catch (error) {
      const message = error.response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    } finally {
      if (isNext) {
        activeCategoryIndex.current += 1;
      }
    }
  };

  useEffect(() => {
    fetchActiveCategory();
  }, []);

  useEffect(() => {
    if (!observerTarget.current || !hasNextCategory) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchActiveChapter();
      }
    });

    observer.observe(observerTarget.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextCategory]);

  return (
    <Wrapper>
      리뷰목록
      <Wrapper.Body>
        <List>
          {activeChapter?.map((each, index) => (
            <ActiveChapterList
              key={index}
              iteratee={each["chapter_num_array"]}
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
