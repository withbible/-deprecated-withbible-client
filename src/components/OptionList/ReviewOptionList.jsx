import React, { useContext } from "react";
import { ToggleButtonGroup, ToggleButton, Typography } from "@mui/material";

// INERTAL IMPORT
import Style from "./OptionList.module.css";
import { QuizContext } from "../../context/QuizContext";

function ReviewOptionList({ questionSeq, iteratee }) {
  const { userOption } = useContext(QuizContext);

  return (
    <ToggleButtonGroup
      disabled
      orientation="vertical"
      className={Style.optionContainer}
    >
      {iteratee.map((each, index) => {
        const isCorrect = each.answer_yn;
        const isHistory = userOption[questionSeq] === each.question_option_seq;

        return (
          <ToggleButton
            key={index}
            value={each.question_option_seq}
            className={`
              ${Style.option} 
              ${isHistory && Style.optionHistory}
              ${isCorrect && Style.optionCorrect}
            `}
          >
            <Typography variant="subtitle2" color="text.secondary">
              {each.question_option}
            </Typography>
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
}

export default ReviewOptionList;
