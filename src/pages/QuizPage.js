import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import queryString from "query-string";

//INTERNAL IMPORT
import {
  ButtonBox,
  OptionList,
  QuestionBox,
  StepperBar,
  Wrapper,
} from "../components";
import { QUIZ_URI, OPTION_HISTORY_URI } from "../constants/api";
import { QUIZ_RESULT_PAGE_PATH } from "../constants/route";

const QuizPage = () => {
  const [quiz, setQuiz] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  // RELATED PAYLOAD
  const [userOption, setUserOption] = useState({}); 
  const [isNewUserOption, setIsNewUserOption] = useState(true);

  // ROUTING
  const { categorySeq, chapterSeq } = queryString.parse(useLocation().search);
  const queryParameter = `?categorySeq=${categorySeq}&chapterSeq=${chapterSeq}`;
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();


  // RELATED HOOK
  const fetchQuiz = async () => {
    const [quizState, optionHistoryState] = await Promise.allSettled([
      axios.get(`${QUIZ_URI}${queryParameter}`),
      axios.get(`${OPTION_HISTORY_URI}${queryParameter}`),
    ]);

    const quizResult = quizState.value.data.result;
    const shuffleQuiz = shuffleArray(quizResult).map((each) => {
      return {
        ...each,
        ["option_array"]: shuffleArray(each["option_array"]),
      };
    });

    setQuiz(shuffleQuiz);

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

  useEffect(() => {
    fetchQuiz();
  }, [categorySeq, chapterSeq]);

  // RELATED PROPS
  const totalStep = () => {
    return Object.keys(quiz).length - 1;
  };

  const handleSubmit = async () => {
    const payload = {
      categorySeq,
      chapterSeq,
      bulk: userOption,
    };

    try {
      if (isNewUserOption) {
        await axios.post(OPTION_HISTORY_URI, payload);
      } else {
        await axios.put(OPTION_HISTORY_URI, payload);
      }

      history.push(`${QUIZ_RESULT_PAGE_PATH}${queryParameter}`);
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    }
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

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return [...array];
};
