import React, { useContext } from "react";
import { Typography } from "@mui/material";

// INTERNAL IMPORT
import ChapterList from "../ChapterList/ChapterList";
import { ChapterContext } from "../../contexts/ChapterContext";
import { findHistory } from "../../utils/util";

// MAIN
function Category() {
  const {
    chapterSearch,
    activeChapter,
    errorMessage: error,
  } = useContext(ChapterContext);

  if (error) {
    return <Typography variant="h4">{error}</Typography>;
  }

  return (
    <>
      {chapterSearch.map((each) => {
        const histories = findHistory({
          iteratee: activeChapter,
          key: "categorySeq",
          target: each.categorySeq,
        });

        return (
          <div key={each.categorySeq}>
            <Typography>{each.category}</Typography>

            <ChapterList
              iteratee={each.chapterNumArray}
              histories={histories && histories.chapterNumArray}
              categorySeq={each.categorySeq}
            />
          </div>
        );
      })}
    </>
  );
}

export default Category;
