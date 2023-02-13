import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { Button, Box } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// INTERNAL IMPORT
import Style from "./ButtonBox.module.css";
import { CLICK_INTERVAL_MILLISECOND } from "../../constants/config";
import { QUIZ_RESULT_PAGE_PATH } from "../../constants/route";
import { QuizContext } from "../../contexts/QuizContext";

function ButtonBox({ isFirst, isLast, isReview = false, setActiveStep }) {
  const { handleSubmit, queryParameter } = useContext(QuizContext);

  const handleBack = () => {
    setActiveStep((prevState) => prevState - 1);
  };

  const handleNext = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  const renderRightSideButtonControl = () => {
    if (isReview && isLast) {
      return (
        <Button
          component={Link}
          to={`${QUIZ_RESULT_PAGE_PATH}${queryParameter}`}
        >
          결과
        </Button>
      );
    }

    if (isLast) {
      return (
        <Button onClick={debounce(handleSubmit, CLICK_INTERVAL_MILLISECOND)}>
          제출
        </Button>
      );
    }

    return (
      <Button onClick={handleNext}>
        <KeyboardArrowRightIcon />
      </Button>
    );
  };

  return (
    <Box className={Style.buttonBox}>
      <Button disabled={isFirst} onClick={handleBack}>
        <KeyboardArrowLeftIcon />
      </Button>

      {renderRightSideButtonControl()}
    </Box>
  );
}

export default ButtonBox;
