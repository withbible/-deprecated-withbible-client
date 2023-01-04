import React from "react";
import { Typography } from "@mui/material";

// INTERNAL IMPORT
import Style from "./QuestionBox.module.css";

function QuestionBox({ question, illustNumber }) {
  return (
    <div className={Style.questionContainer}>
      <img
        className={Style.illust}
        src={`/images/illust0${illustNumber}.png`}
        alt="퀴즈 일러스트"
      />
      <Typography className={Style.question}>{question}</Typography>
    </div>
  );
}

export default QuestionBox;
