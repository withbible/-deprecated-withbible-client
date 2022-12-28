import React from "react";
import { Typography } from "@mui/material";

// INTERNAL IMPORT
import Style from "./QuestionBox.module.css";

// HELPER FUNCTION
function getRandomNumber() {
  const max = 6;
  const min = 1;

  return Math.floor(Math.random() * max + min);
}

// MAIN
function QuestionBox({ question }) {
  return (
    <div className={Style.questionContainer}>
      <img
        className={Style.illust}
        src={`/images/illust0${getRandomNumber()}.png`}
        alt="퀴즈 일러스트"
      />
      <Typography className={Style.question}>{question}</Typography>
    </div>
  );
}

export default QuestionBox;
