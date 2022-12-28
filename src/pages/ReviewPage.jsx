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
import { QuizContext } from "../context/QuizContext";
import NotFoundPage from "./NotFoundPage";

function ReviewPage() {
  const { quiz, fetchQuiz, totalStep } = useContext(QuizContext);
  const [activeStep, setActiveStep] = useState(0);
  const queryParameter = useLocation().search;
  const { categorySeq, chapterNum } = queryString.parse(queryParameter);

  // TODO: 이전 퀴즈가 잠깐 보이는 이슈
  useEffect(() => {
    fetchQuiz({ shuffle: false });
  }, [categorySeq, chapterNum]);

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
        iteratee={quiz}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />

      <Wrapper.Body>
        <QuestionBox question={quiz[activeStep].question} />

        <ReviewOptionList
          questionSeq={quiz[activeStep].question_seq}
          iteratee={quiz[activeStep].option_array}
        />

        <ButtonBox
          isFirst={activeStep === 0}
          isLast={activeStep === totalStep()}
          isReview
          setActiveStep={setActiveStep}
        />
      </Wrapper.Body>
    </Wrapper>
  );
}

export default ReviewPage;
