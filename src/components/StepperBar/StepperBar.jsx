import React from "react";
import { Stepper, Step, StepButton } from "@mui/material";

// INTERNAL IMPORT
import "./StepperBar.css";

function StepperBar({ iteratee, activeStep, setActiveStep }) {
  const handleStep = (step) => {
    setActiveStep(step);
  };

  return (
    <Stepper nonLinear activeStep={activeStep}>
      {iteratee.map((each, index) => {
        return (
          <Step key={index}>
            <StepButton onClick={() => handleStep(index)} />
          </Step>
        );
      })}
    </Stepper>
  );
}

export default StepperBar;
