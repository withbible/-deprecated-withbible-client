import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { Typography } from "@mui/material";

// INTERNAL IMPORT
import {
  ButtonBox,
  ReviewOptionList,
  QuestionBox,
  StepperBar,
  Wrapper,
} from "../components";
import { CATEGORY } from "../constants/enum";
import { QuizContext } from "../contexts/QuizContext";
import { getIllustNumbers, getTotalStep } from "../utils/util";
import NotFoundPage from "./NotFoundPage";

function ReviewPage() {
  const { quiz, fetchQuiz } = useContext(QuizContext);
  const [activeStep, setActiveStep] = useState(0);
  const [illustNumbers, setIllustNumbers] = useState([]);
  const queryParameter = useLocation().search;
  const { categorySeq, chapterNum } = queryString.parse(queryParameter);

  useEffect(() => {
    fetchQuiz({ shuffle: false });
  }, [categorySeq, chapterNum]);

  useEffect(() => {
    setIllustNumbers(getIllustNumbers(quiz.length));
  }, [quiz.length]);

  if (!quiz.length) {
    return (
      <NotFoundPage
        title={`${CATEGORY[categorySeq]} ch.${chapterNum} 리뷰`}
        message="데이터를 불러오는 중입니다..."
      />
    );
  }

  return (
    <Wrapper>
      <Typography>
        {CATEGORY[categorySeq]} ch.{chapterNum} 리뷰
      </Typography>

      <StepperBar
        iteratee={[...quiz.keys()]}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />

      <Wrapper.Body>
        <QuestionBox
          question={quiz[activeStep].question}
          illustNumber={illustNumbers[activeStep]}
        />

        <ReviewOptionList
          questionSeq={quiz[activeStep].question_seq}
          iteratee={quiz[activeStep].option_array}
        />

        <ButtonBox
          isFirst={activeStep === 0}
          isLast={activeStep === getTotalStep(quiz.length)}
          isReview
          setActiveStep={setActiveStep}
        />
      </Wrapper.Body>
    </Wrapper>
  );
}

export default ReviewPage;
