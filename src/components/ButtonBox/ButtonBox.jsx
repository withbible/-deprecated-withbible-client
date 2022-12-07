import React from "react";
import { Button, Box } from "@mui/material";

//INTERNAL IMPORT
import Style from "./ButtonBox.module.css";

const ButtonBox = ({ isFirst, isLast, setActiveStep, handleSubmit }) => {
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

      {isLast ? (
        <Button onClick={() => handleSubmit()}>제출</Button>
      ) : (
        <Button onClick={() => handleNext()}>다음</Button>
      )}
    </Box>
  );
};

export default ButtonBox;
