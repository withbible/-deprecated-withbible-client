import React, { useContext } from "react";
import { Typography } from "@mui/material";

//INTERNAL IMPORT
import ChapterList from "../ChapterList/ChapterList";
import { ChapterContext } from "../../context/ChapterContext";

const ChapterListWrapper = ({ iteratee, activeChapter, children }) => {
  return iteratee.map((each, index) => {
    const isHistory = activeChapter[index];

    return React.cloneElement(children, {
      key: index,
      title: each.category,
      categorySeq: each["category_seq"],
      iteratee: each["chapter_num_array"],
      histories: isHistory && activeChapter[index]["chapter_num_array"],
    });
  });
};

const Category = () => {
  const { chapterSearch, activeChapter, error } = useContext(ChapterContext);

  if (error) {
    return <Typography variant="h4">{error}</Typography>;
  }

  return (
    <ChapterListWrapper
      iteratee={chapterSearch}
      activeChapter={activeChapter.length && activeChapter}
    >
      <ChapterList />
    </ChapterListWrapper>
  );
};

export default Category;
