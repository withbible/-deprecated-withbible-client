import React, { useContext } from "react";
import { Typography } from "@mui/material";

// INTERNAL IMPORT
import ChapterList from "../ChapterList/ChapterList";
import { ChapterContext } from "../../context/ChapterContext";

// HELPER FUNCTION
function findHistory(iteratee, target) {
  return iteratee.find((each) => each.category_seq === target);
}

// MAIN
function Category() {
  const { chapterSearch, activeChapter, error } = useContext(ChapterContext);

  if (error) {
    return <Typography variant="h4">{error}</Typography>;
  }

  return (
    <>
      {chapterSearch.map((each, index) => {
        const history = findHistory(activeChapter, each.category_seq);

        return (
          <ChapterList
            key={index}
            title={each.category}
            categorySeq={each.category_seq}
            iteratee={each.chapter_num_array}
            histories={history && history.chapter_num_array}
          />
        );
      })}
    </>
  );
}

export default Category;
