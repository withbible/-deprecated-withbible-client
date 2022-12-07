import React, { useState, useEffect, useCallback } from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

//INTERNAL IMPORT
import Wrapper from "../components/Wrapper/Wrapper";
import StepperBar from "../components/StepperBar/StepperBar";
import ButtonBox from "../components/ButtonBox/ButtonBox";
import QuestionBox from "../components/QuestionBox/QuestionBox";
import OptionList from "../components/OptionList/OptionList";

const QuizPage = () => {
  const { categorySeq, chapterSeq } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [userOption, setUserOption] = useState({});
  const [isNewUserOption, setIsNewUserOption] = useState(true);

  const fetchQuizUri = `/quiz/chapter?categorySeq=${categorySeq}&chapterSeq=${chapterSeq}`;
  const optionHistoryUri = "/history/chapter/user-option";
  const fetchOptionHistoryUri = `${optionHistoryUri}?categorySeq=${categorySeq}&chapterSeq=${chapterSeq}`;

  const totalStep = () => {
    return Object.keys(quiz).length - 1;
  };

  const fetchQuiz = async () => {
    const [quizState, optionHistoryState] = await Promise.allSettled([
      axios.get(fetchQuizUri),
      axios.get(fetchOptionHistoryUri),
    ]);

    const quizResult = quizState.value.data.result;

    setQuiz(quizResult);

    // TODO: for-of는 비동기인 이유
    if (!optionHistoryState.value) {
      for (const each of quizResult) {
        setUserOption((prevState) => {
          return {
            ...prevState,
            [each["question_seq"]]: null,
          };
        });
      }

      return;
    }

    const optionHistoryResult = optionHistoryState.value.data.result;

    for (const each of optionHistoryResult) {
      setIsNewUserOption(false);
      setUserOption((prevState) => {
        return {
          ...prevState,
          [each["question_seq"]]: each["question_option_seq"],
        };
      });
    }
  };

  const memoizeQuizPageState = useCallback(() => {
    fetchQuiz();
  }, [categorySeq, chapterSeq]);

  useEffect(() => {
    memoizeQuizPageState();
  }, []);

  const handleSubmit = () => {
    const payload = {
      categorySeq,
      chapterSeq,
      bulk: userOption,
    };

    if (isNewUserOption) {
      axios.post(optionHistoryUri, payload);
      return;
    }

    axios.put(optionHistoryUri, payload);
  };

  // ERROR HANDLE
  if (!quiz.length || !Object.keys(userOption).length) {
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
        iteratee={quiz}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />

      <Wrapper.Body>
        <QuestionBox question={quiz[activeStep]["question"]} />

        <OptionList
          questionSeq={quiz[activeStep]["question_seq"]}
          iteratee={quiz[activeStep]["option_array"]}
          userOption={userOption}
          setUserOption={setUserOption}
        />

        <ButtonBox
          isFirst={activeStep === 0}
          isLast={activeStep && activeStep === totalStep()}
          setActiveStep={setActiveStep}
          handleSubmit={handleSubmit}
        />
      </Wrapper.Body>
    </Wrapper>
  );
};

export default QuizPage;
