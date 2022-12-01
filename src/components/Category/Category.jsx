import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Style from "./Category.module.css";
import Chapter from "../Chapter/Chapter";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/quiz/categories").then(({ data }) => {
      setCategories(data.result);
    });
  }, [setCategories]);

  return (
    <>
      {categories.map((each, index) => {
        const maxChapter = index + 1;

        const chapterSeqArray = [...Array(maxChapter).keys()].map(
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
