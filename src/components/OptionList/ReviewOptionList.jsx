import React, { useContext } from "react";
import { ToggleButtonGroup, ToggleButton, Typography } from "@mui/material";

// INERTAL IMPORT
import Style from "./OptionList.module.css";
import { QuizContext } from "../../contexts/QuizContext";

function ReviewOptionList({ questionSeq, iteratee }) {
  const { userOption } = useContext(QuizContext);

  return (
    <ToggleButtonGroup
      disabled
      orientation="vertical"
      className={Style.optionContainer}
    >
      {iteratee.map((each) => {
        const isCorrect = each.answerYN;
        const isHistory = userOption[questionSeq] === each.questionOptionSeq;

        return (
          <ToggleButton
            key={each.questionOptionSeq}
            value={each.questionOptionSeq}
            className={`
              ${Style.option} 
              ${isHistory && Style.optionHistory}
              ${isCorrect && Style.optionCorrect}
            `}
          >
            <Typography variant="subtitle2" color="text.secondary">
              {each.questionOption}
            </Typography>
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
}

export default ReviewOptionList;
