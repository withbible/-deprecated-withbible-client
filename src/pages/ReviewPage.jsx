import React, { useState, useEffect, useContext } from "react";
import queryString from "query-string";

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
import { getIllustNumbers, getTotalStep } from "../utils";
import NotFoundPage from "./NotFoundPage";

function ReviewPage() {
  const { quiz, fetchQuiz, queryParameter } = useContext(QuizContext);
  const [activeStep, setActiveStep] = useState(0);
  const [illustNumbers, setIllustNumbers] = useState([]);
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
        title={`${CATEGORY[categorySeq]} Ch.${chapterNum} 리뷰`}
        message="데이터를 불러오는 중입니다..."
      />
    );
  }

  return (
    <Wrapper>
      <Wrapper.Header>
        {CATEGORY[categorySeq]} Ch.{chapterNum} 리뷰
      </Wrapper.Header>

      <StepperBar
        iteratee={[...quiz.keys()]}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />

      <Wrapper.Body>
        <QuestionBox
          question={quiz[activeStep].question}
          questionSub={quiz[activeStep].questionSub}
          illustNumber={illustNumbers[activeStep]}
        />

        <ReviewOptionList
          questionSeq={quiz[activeStep].questionSeq}
          iteratee={quiz[activeStep].optionArray}
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
