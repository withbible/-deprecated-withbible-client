import React from "react";
import { Button } from "@mui/material";

//INTERNAL IMPORT
import Style from "./ButtonBox.module.css";

const ButtonBox = ({ isFirst, isLast, setActiveStep }) => {
  const handleBack = () => {
    setActiveStep((prevState) => prevState - 1);
  };

  const handleNext = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  return (
    <div className={Style.buttonContainer}>
      <Button disabled={isFirst} onClick={() => handleBack()}>
        Back
      </Button>

      {isLast? (
        <Button onClick={() => handleSubmit()}>SUBMIT</Button>
      ) : (
        <Button onClick={() => handleNext()}>Next</Button>
      )}
    </div>
  );
};

export default ButtonBox;
