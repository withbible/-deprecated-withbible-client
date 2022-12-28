import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { Button, Box } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// INTERNAL IMPORT
import Style from "./ButtonBox.module.css";
import { QUIZ_RESULT_PAGE_PATH } from "../../constants/route";
import { QuizContext } from "../../context/QuizContext";

function ButtonBox({
  isFirst,
  isLast,
  isReview,
  setActiveStep,
  queryParameter,
}) {
  const { handleSubmit } = useContext(QuizContext);

  const handleBack = () => {
    setActiveStep((prevState) => prevState - 1);
  };

  const handleNext = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  return (
    <Box className={Style.buttonContainer}>
      <Button disabled={isFirst} onClick={handleBack}>
        <KeyboardArrowLeftIcon />
      </Button>
      {{
        [isReview && isLast]: (
          <Button
            component={Link}
            to={`${QUIZ_RESULT_PAGE_PATH}${queryParameter}`}
          >
            결과
          </Button>
        ),
        [isLast]: <Button onClick={debounce(handleSubmit, 250)}>제출</Button>,
        [!isLast]: (
          <Button onClick={handleNext}>
            <KeyboardArrowRightIcon />
          </Button>
        ),
      }}
    </Box>
  );
}

export default ButtonBox;
