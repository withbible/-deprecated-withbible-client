import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

// INTERNAL IMPORT
import {
  ButtonBox,
  OptionList,
  QuestionBox,
  StepperBar,
  Wrapper,
} from "../components";
import { CATEGORY } from "../constants/enum";
import { QuizContext } from "../context/QuizContext";
import NotFoundPage from "./NotFoundPage";

// HELPER FUNCTION
function getRandomNumber() {
  const max = 9;
  const min = 1;

  return Math.floor(Math.random() * max + min);
}

function getIllustNumbers(length) {
  const result = [];

  for (let i = 0; i < length; i += 1) {
    result.push(getRandomNumber());
  }

  return result;
}

// MAIN
function QuizPage() {
  const { quiz, fetchQuiz, totalStep } = useContext(QuizContext);
  const [activeStep, setActiveStep] = useState(0);
  const [illustNumbers, setIllustNumbers] = useState([]);
  const queryParameter = useLocation().search;
  const { categorySeq, chapterNum } = queryString.parse(queryParameter);

  useEffect(() => {
    fetchQuiz({ shuffle: true });
  }, [queryParameter]);

  useEffect(() => {
    setIllustNumbers(getIllustNumbers(quiz.length));
  }, [quiz.length]);

  if (!quiz.length) {
    return (
      <NotFoundPage
        title={`${CATEGORY[categorySeq]} ch.${chapterNum}`}
        message="데이터를 불러오는 중입니다..."
      />
    );
  }

  return (
    <Wrapper>
      {CATEGORY[categorySeq]} ch.{chapterNum}
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

        <OptionList
          questionSeq={quiz[activeStep].question_seq}
          iteratee={quiz[activeStep].option_array}
        />

        <ButtonBox
          isFirst={activeStep === 0}
          isLast={activeStep === totalStep()}
          setActiveStep={setActiveStep}
        />
      </Wrapper.Body>
    </Wrapper>
  );
}

export default QuizPage;
