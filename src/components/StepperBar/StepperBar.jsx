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
      {iteratee.map((each) => {
        return (
          <Step key={each}>
            <StepButton onClick={() => handleStep(each)} />
          </Step>
        );
      })}
    </Stepper>
  );
}

export default StepperBar;
