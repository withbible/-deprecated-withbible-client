import React from "react";
import { Paper, Button } from "@mui/material";

//INTERNAL IMPORT
import Style from "./Chapter.module.css";
import { QUIZ_PAGE_PATH } from "../../constants/route";

const Chapter = ({ itemId, categorySeq, chapterSeq }) => {
  const queryParameter = `?categorySeq=${categorySeq}&chapterSeq=${chapterSeq}`;

  return (
    <>
      <Button href={`${QUIZ_PAGE_PATH}${queryParameter}`}>
        <Paper className={Style.chapterPaper} elevation={3}>
          ch.{chapterSeq}
        </Paper>
      </Button>
    </>
  );
};

export default Chapter;
