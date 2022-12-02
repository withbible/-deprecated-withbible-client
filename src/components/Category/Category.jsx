import React, { useContext, useState } from "react";
import { Typography } from "@mui/material";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

//INTERNAL IMPORT
import Style from "./Category.module.css";
import Chapter from "../Chapter/Chapter";
import { ChapterSearchContext } from "../../context/ChapterSearchContext";

const Category = () => {
  const { fetchChapter, searchRecord, searchKeyword } =
    useContext(ChapterSearchContext);
  const [categories, setCategories] = useState([]);

  fetchChapter().then(({ data }) => {
    setCategories(data.result);
  });

  if (!categories) {
    return <h3>데이터를 불러오는 중입니다...</h3>;
  }

  if (searchKeyword && !searchRecord.length) {
    return <h3>데이터가 존재하지 않습니다.</h3>;
  }

  if (searchRecord.length) {
    return (
      <>
        {searchRecord.map((each, index) => {
          return (
            <div key={index}>
              <Typography className={Style.categoryTitle}>
                {each.category}
              </Typography>

              <ScrollMenu>
                {each["chapter_seq_array"].map((each, index) => (
                  <Chapter key={index} chapterSeq={each} />
                ))}
              </ScrollMenu>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <>
      {categories.map((each, index) => {
        const chapterSeqArray = [...Array(each["max_chapter"]).keys()].map(
          (_, index) => index + 1
        );

        return (
          <div key={index}>
            <Typography className={Style.categoryTitle}>
              {each.category}
            </Typography>

            <ScrollMenu>
              {chapterSeqArray.map((each, index) => (
                <Chapter key={index} chapterSeq={each} />
              ))}
            </ScrollMenu>
          </div>
        );
      })}
    </>
  );
};

export default Category;
