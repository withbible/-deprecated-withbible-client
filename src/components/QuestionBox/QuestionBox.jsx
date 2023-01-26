import React from "react";
import { Typography, Box } from "@mui/material";

// INTERNAL IMPORT
import Style from "./QuestionBox.module.css";

function QuestionBox({ question, questionSub, illustNumber }) {
  return (
    <div className={Style.questionContainer}>
      <img
        className={Style.illust}
        src={`/images/illusts/illust0${illustNumber}.png`}
        alt="퀴즈 일러스트"
      />

      <Typography>{question}</Typography>

      {questionSub && <Box className={Style.questionSub}>{questionSub}</Box>}
    </div>
  );
}

export default QuestionBox;
