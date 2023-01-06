import React from "react";
import { Link } from "react-router-dom";
import { Paper, Button } from "@mui/material";

// INTERNAL IMPORT
import Style from "./Chapter.module.css";
import { QUIZ_PAGE_PATH } from "../../constants/route";

function Chapter({ itemId: chapterNum, history, categorySeq }) {
  const queryParameter = `?categorySeq=${categorySeq}&chapterNum=${chapterNum}`;

  return (
    <Button component={Link} to={`${QUIZ_PAGE_PATH}${queryParameter}`}>
      <Paper
        className={`
        ${Style.chapterPaper}
        ${history && Style.paperHistory}
      `}
        elevation={3}
      >
        Ch.{chapterNum}
      </Paper>
    </Button>
  );
}

export default Chapter;
