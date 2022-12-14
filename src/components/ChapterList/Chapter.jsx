import React from "react";
import { Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

//INTERNAL IMPORT
import Style from "./Chapter.module.css";
import { QUIZ_PAGE_PATH } from "../../constants/route";

const Chapter = ({ itemId, categorySeq, chapterNum }) => {
  const queryParameter = `?categorySeq=${categorySeq}&chapterNum=${chapterNum}`;

  return (
    <>
      <Button component={Link} to={`${QUIZ_PAGE_PATH}${queryParameter}`}>
        <Paper className={Style.chapterPaper} elevation={3}>
          Ch.{chapterNum}
        </Paper>
      </Button>
    </>
  );
};

export default Chapter;
