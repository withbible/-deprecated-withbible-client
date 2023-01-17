import React, { useState, useEffect, useContext } from "react";
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
import { QuizContext } from "../contexts/QuizContext";
import { getIllustNumbers, getTotalStep } from "../utils/util";
import NotFoundPage from "./NotFoundPage";

function QuizPage() {
  const { quiz, fetchQuiz, queryParameter } = useContext(QuizContext);
  const [activeStep, setActiveStep] = useState(0);
  const [illustNumbers, setIllustNumbers] = useState([]);
  const { categorySeq, chapterNum } = queryString.parse(queryParameter);

  /**
   * @todo 이전 퀴즈가 잠깐 보이는 이슈
   */
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
      <Wrapper.Header>
        {CATEGORY[categorySeq]} ch.{chapterNum}
      </Wrapper.Header>

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
          questionSeq={quiz[activeStep].questionSeq}
          iteratee={quiz[activeStep].optionArray}
        />

        <ButtonBox
          isFirst={activeStep === 0}
          isLast={activeStep === getTotalStep(quiz.length)}
          setActiveStep={setActiveStep}
        />
      </Wrapper.Body>
    </Wrapper>
  );
}

export default QuizPage;
