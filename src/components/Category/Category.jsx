import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

//INTERNAL IMPORT
import Style from "./Category.module.css";
import Chapter from "../Chapter/Chapter";

const Category = () => {
  const [categories, setCategories] = useState({
    categories: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [categoryResult] = await Promise.all([
        axios.get("/quiz/category/max-chapter"),
      ]);

      setCategories({
        categories: categoryResult.data.result,
      });
    };

    fetchData();
  }, [setCategories]);

  if (!categories.categories) {
    return <h3>데이터를 불러오는 중입니다...</h3>;
  }

  return (
    <>
      {categories.categories.map((each, index) => {
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
