import React, { useState, useEffect, useCallback } from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

//INTERNAL IMPORT
import Wrapper from "../components/Wrapper/Wrapper";
import StepperBar from "../components/StepperBar/StepperBar";
import ButtonBox from "../components/ButtonBox/ButtonBox";
import QuestionBox from "../components/QuestionBox/QuestionBox";

const QuizPage = () => {
  const { categorySeq, chapterSeq } = useParams();
  const [data, setData] = useState({
    questionSeqArray: [],
    optionHistoryArray: [],
  });
  const [activeStep, setActiveStep] = useState(0);
  const [userOption, setUserOption] = useState({});

  const fetchQuestionSeqUri = `/quiz/chapter/questions?categorySeq=${categorySeq}&chapterSeq=${chapterSeq}`;
  const fetchOptionHistoryUri = `/history/chapter/user-option?categorySeq=${categorySeq}&chapterSeq=${chapterSeq}&userSeq=1`;

  const totalStep = () => {
    return Object.keys(data.questionSeqArray).length - 1;
  };

  const fetchQuiz = async () => {
    const [questionSeqResult, optionHistoryResult] = await Promise.all([
      axios.get(fetchQuestionSeqUri),
      axios.get(fetchOptionHistoryUri),
    ]);

    setData({
      questionSeqArray: questionSeqResult.data.result,
      optionHistoryArray: optionHistoryResult.data.result,
    });

    for (const each of data.questionSeqArray) {
      setUserOption((prevState) => {
        return { ...prevState, [each["question_seq"]]: null };
      });
    }
  };

  const memoizeQuizPageState = useCallback(() => {
    fetchQuiz();
  }, [categorySeq, chapterSeq]);

  useEffect(() => {
    memoizeQuizPageState();
  }, []);

  // ERROR HANDLE
  if (!data.questionSeqArray.length || !data.optionHistoryArray.length) {
    return (
      <Wrapper>
        <Typography>
          카테고리: {categorySeq} (ch. {chapterSeq})
        </Typography>

        <Wrapper.Body>
          <h3>데이터를 불러오는 중입니다...</h3>
        </Wrapper.Body>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Typography>
        카테고리: {categorySeq} (ch. {chapterSeq})
      </Typography>

      <StepperBar
        iteratee={data.questionSeqArray}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />

      <Wrapper.Body>
        <QuestionBox question={data.questionSeqArray[activeStep]["question"]} />

        <ButtonBox
          isFirst={activeStep === 0}
          isLast={activeStep && activeStep === totalStep()}
          setActiveStep={setActiveStep}
        />
      </Wrapper.Body>
    </Wrapper>
  );
};

export default QuizPage;
