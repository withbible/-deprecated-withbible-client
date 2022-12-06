import React from "react";
import { Typography } from "@mui/material";

//INTERNAL IMPORT
import Style from "./QuestionBox.module.css";
import illust from "../../images/illust01.png";

const QuestionBox = ({ question }) => {
  return (
    <div className={Style.questionContainer}>
      <img className={Style.illust} src={illust} />
      <Typography className={Style.question}>
        {question}
      </Typography>
    </div>
  )
};

export default QuestionBox;