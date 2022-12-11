import React, { useState, useContext } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

//INTERNAL IMPORT
import Style from "./OptionList.module.css";
import { QuizContext } from "../../context/QuizContext";

const OptionList = ({ questionSeq, iteratee }) => {
  const { userOption, setUserOption } = useContext(QuizContext);
  const [optionState, setOptionState] = useState(0);

  const handleOption = (_, option) => {
    setOptionState(option);

    setUserOption({ ...userOption, [questionSeq]: option });
  };

  return (
    <ToggleButtonGroup
      value={optionState}
      exclusive
      orientation="vertical"
      onChange={handleOption}
      className={Style.optionContainer}
    >
      {iteratee.map((each, index) => {
        const isHistory =
          userOption[questionSeq] === each["question_option_seq"];

        return (
          <ToggleButton
            key={index}
            value={each["question_option_seq"]}
            selected={isHistory}
            className={`
              ${Style.option} 
              ${isHistory && Style.optionHistory}
            `}
          >
            {each["question_option"]}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};

export default OptionList;
