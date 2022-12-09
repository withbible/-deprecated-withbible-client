import React, { useContext } from "react";
import { Button, Box } from "@mui/material";
import { debounce } from "lodash";

//INTERNAL IMPORT
import Style from "./ButtonBox.module.css";
import { QUIZ_RESULT_PAGE_PATH } from "../../constants/route";
import { QuizContext } from "../../context/QuizContext";

const ButtonBox = ({ isFirst, isLast, isReview, setActiveStep }) => {
  const { handleSubmit, queryParameter } = useContext(QuizContext);

  const handleBack = () => {
    setActiveStep((prevState) => prevState - 1);
  };

  const handleNext = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  return (
    <Box className={Style.buttonContainer}>
      <Button disabled={isFirst} onClick={() => handleBack()}>
        이전
      </Button>

      {isReview && isLast ? (
        <Button href={`${QUIZ_RESULT_PAGE_PATH}${queryParameter}`}>결과</Button>
      ) : isLast ? (
        // TODO: 서버 모니터링에 따른 적절한 wait time 부여 필요
        <Button onClick={debounce(() => handleSubmit(), 250)}>제출</Button>
      ) : (
        <Button onClick={() => handleNext()}>다음</Button>
      )}
    </Box>
  );
};

export default ButtonBox;
