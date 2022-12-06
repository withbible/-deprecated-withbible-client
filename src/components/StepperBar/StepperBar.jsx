import React from "react";
import { Stepper, Step, StepButton } from "@mui/material";

//INTERNAL IMPORT
import "./StepperBar.css";

const StepperBar = ({ iteratee, activeStep, setActiveStep }) => {
  // TODO: 스탭바에서 조작시 버튼바와 싱크가 맞지 않음
  const handleStep = (step) => {
    setActiveStep(step);
  };

  return (
    <Stepper nonLinear activeStep={activeStep}>
      {iteratee.map((_, index) => {
        return (
          <Step key={index}>
            <StepButton onClick={() => handleStep(index)} />
          </Step>
        );
      })}
    </Stepper>
  );
};

export default StepperBar;
