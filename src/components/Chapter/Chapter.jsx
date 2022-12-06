import React from "react";
import { Paper, Link } from "@mui/material";

//INTERNAL IMPORT
import Style from "./Chapter.module.css";

const Chapter = ({ itemId, categorySeq, chapterSeq, }) => {
  const uri = `/quiz/${categorySeq}/${chapterSeq}`;

  return (
    <>
      <Paper className={Style.chapterPaper}>
        <Link href={uri}> ch.{chapterSeq}</Link>
      </Paper>
    </>
  );
};

export default Chapter;
