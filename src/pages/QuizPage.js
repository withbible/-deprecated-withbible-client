import React, { useState, useEffect, useCallback } from "react";
import { Typography, Stepper, Step, StepButton, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

//INTERNAL IMPORT
import Style from "./QuizPage.module.css";
import Wrapper from "../components/Wrapper/Wrapper";
import illust from "../images/illust01.png";

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

  const fetchQuiz = async () => {
    const [questionSeqResult, optionHistoryResult] = await Promise.all([
      axios.get(fetchQuestionSeqUri),
      axios.get(fetchOptionHistoryUri),
    ]);

    setData({
      questionSeqArray: questionSeqResult.data.result,
      optionHistoryArray: optionHistoryResult.data.result,
    });
  };

  const setUserOptionKeys = () => {
    for (const each of data.questionSeqArray) {
      setUserOption((prevState) => {
        return {...prevState, [each["question_seq"]]: null };
      });
    }
  };

  const memoizeQuizPageState = useCallback(() => {
    fetchQuiz();
    setUserOptionKeys();
  }, [categorySeq, chapterSeq]);

  useEffect(() => {
    memoizeQuizPageState();
  }, []);  

  // ERROR HANDLE
  if (!data.questionSeqArray.length || !data.optionHistoryArray.length) {
    return <h3>데이터를 불러오는 중입니다...</h3>;
  }

  const handleBack = () => {
    setActiveStep((prevState) => prevState - 1);
  };

  const handleNext = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  const handleStep = (step) => {
    setActiveStep(step);
  };

  return (
    <Wrapper>
      카테고리: {categorySeq} (ch. {chapterSeq})
      <Stepper nonLinear activeStep={activeStep}>
        {data.questionSeqArray.map((each, index) => {
          return (
            <Step key={index} className={Style.step}>
              <StepButton onClick={() => handleStep(index)} />
            </Step>
          );
        })}
      </Stepper>
      <Wrapper.Body>
        <div className={Style.questionContainer}>
          <img className={Style.illust} src={illust} />
          <Typography>{data.questionSeqArray[1]["question"]}</Typography>
        </div>

        <div className={Style.buttonContainer}>
          <Button disabled={activeStep === 0} onClick={() => handleBack}>
            Back
          </Button>

          <Button onClick={() => handleNext}>Next</Button>
        </div>
      </Wrapper.Body>
    </Wrapper>
  );
};

export default QuizPage;
