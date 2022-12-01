import React from "react";
import { Grid, Paper } from "@mui/material";

//INTERNAL IMPORT
import Style from "./Chapter.module.css";

const Chapter = ({ chapterSeq }) => {
  return (
    <Grid className={Style.chapterGrid}>
      <Paper className={Style.chapterPaper}>{chapterSeq}</Paper>
    </Grid>
  );
};

export default Chapter;
