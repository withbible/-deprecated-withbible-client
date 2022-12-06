import React, { useContext, useEffect } from "react";

//INTERNAL IMPORT
import ChapterList from "../Chapter/ChapterList";
import { ChapterSearchContext } from "../../context/ChapterSearchContext";

const Category = () => {
  const { error, fetchMaxChapter, searchRecord } =
    useContext(ChapterSearchContext);

  // TODO: dependency 넣으면 무한 fetching
  useEffect(() => {
    fetchMaxChapter();
  }, []);

  if (!searchRecord.maxChapter.length) {
    return <h3>데이터를 불러오는 중입니다...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  if (searchRecord.chapterSearch.length) {
    return (
      <>
        {searchRecord.chapterSearch.map((each, index) => {
          return (
            <ChapterList
              key={index}
              iteratee={each["chapter_seq_array"]}
              title={each.category}
              categorySeq={each["category_seq"]}
            />
          );
        })}
      </>
    );
  }

  return (
    <>
      {searchRecord.maxChapter.map((each, index) => {
        const chapterSeqArray = [...Array(each["max_chapter"]).keys()].map(
          (_, index) => index + 1
        );

        return (
          <ChapterList
            key={index}
            iteratee={chapterSeqArray}
            title={each.category}
            categorySeq={each["category_seq"]}
          />
        );
      })}
    </>
  );
};

export default Category;
