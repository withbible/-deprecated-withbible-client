import React, { useContext, useEffect } from "react";

//INTERNAL IMPORT
import ChapterList from "../ChapterList/ChapterList";
import { ChapterContext } from "../../context/ChapterContext";

const Category = () => {
  const { fetchMaxChapter, maxChapter, chapterSearch, activeChapter } =
    useContext(ChapterContext);

  /**
   * TODO: 검색기능 이후 렌더링은 다른 API 사용
   * 빈문자 검색시 본 API 유지하고 싶으나
   * searchKeyword 또는 searchRecord를 dependencty에 추가할 시 무한 fetching
   */

  useEffect(() => {
    fetchMaxChapter();
  }, []);

  if (!maxChapter.length) {
    return <h3>데이터를 불러오는 중입니다...</h3>;
  }

  if (!activeChapter.length) {
    return (
      <>
        {maxChapter.map((each, index) => (
          <ChapterList
            key={index}
            iteratee={makeSequence(each["max_chapter"])}
            title={each.category}
            categorySeq={each["category_seq"]}
          />
        ))}
      </>
    );
  }

  if (chapterSearch.length) {
    return (
      <>
        {chapterSearch.map((each, index) => {
          return (
            <ChapterList
              key={index}
              iteratee={each["chapter_num_array"]}
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
      {maxChapter.map((each, index) => (
        <ChapterList
          key={index}
          iteratee={makeSequence(each["max_chapter"])}
          histories={
            activeChapter[index] && activeChapter[index]["chapter_num_array"]
          }
          title={each.category}
          categorySeq={each["category_seq"]}
        />
      ))}
    </>
  );
};

export default Category;

function makeSequence(iteratee) {
  return [...Array(iteratee).keys()].map((_, index) => index + 1);
}
