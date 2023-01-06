import React, { useState, useContext } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

// INTERNAL IMPORT
import Style from "./OptionList.module.css";
import { QuizContext } from "../../contexts/QuizContext";

function OptionList({ questionSeq, iteratee }) {
  const { userOption, setUserOption } = useContext(QuizContext);
  const [optionState, setOptionState] = useState(0);

  const handleOption = (_, option) => {
    setOptionState(option);
    setUserOption((prevState) => {
      return { ...prevState, [questionSeq]: option };
    });
  };

  return (
    <ToggleButtonGroup
      value={optionState}
      exclusive
      orientation="vertical"
      onChange={handleOption}
      className={Style.optionContainer}
    >
      {iteratee.map((each) => {
        const isHistory = userOption[questionSeq] === each.questionOptionSeq;

        return (
          <ToggleButton
            key={each.questionOptionSeq}
            value={each.questionOptionSeq}
            selected={isHistory}
            className={`
              ${Style.option} 
              ${isHistory && Style.optionHistory}
            `}
          >
            {each.questionOption}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
}

export default OptionList;
