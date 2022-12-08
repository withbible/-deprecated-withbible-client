import React from "react";
import { Paper, Link } from "@mui/material";

//INTERNAL IMPORT
import Style from "./Chapter.module.css";
import { QUIZ_URI } from "../../constants/api";

const Chapter = ({ itemId, categorySeq, chapterSeq }) => {
  return (
    <>
      <Paper className={Style.chapterPaper}>
        <Link
          href={`${QUIZ_URI}?categorySeq=${categorySeq}&chapterSeq=${chapterSeq}`}
        >
          ch.{chapterSeq}
        </Link>
      </Paper>
    </>
  );
};

export default Chapter;
