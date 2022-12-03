import React from "react";
import { Paper } from "@mui/material";

//INTERNAL IMPORT
import Style from "./Chapter.module.css";

function Chapter({ chapterSeq, itemId }) {
  return (
    <>
      <Paper className={Style.chapterPaper}>ch.{chapterSeq}</Paper>
    </>
  );
}

export default Chapter;
