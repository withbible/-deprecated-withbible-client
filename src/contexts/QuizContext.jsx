import React, { useState, useMemo } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

// INTERNAL IMPORT
import { QUIZ_URI, OPTION_HISTORY_URI } from "../constants/api";
import { QUIZ_RESULT_PAGE_PATH } from "../constants/route";
import { AUTH_HEADER_CONFIG } from "../constants/config";

// CONSTANT
const MAX_QUESTION_COUNT = 3;

// HELPER FUNCTION
function shuffleArray(array) {
  const result = [...array];

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

/**
 * @todo 해당 함수는 비동기로 동작해도 문제가 없다. 다만 shuffleArray를 비동기로 변환하면 에러가 발생한다.
 */
function shuffleQuiz(quiz) {
  return shuffleArray(quiz).map((each) => ({
    ...each,
    optionArray: shuffleArray(each.optionArray),
  }));
}

// MAIN
export const QuizContext = React.createContext();

export function QuizProvider({ children }) {
  const [quiz, setQuiz] = useState([]);
  const [userOption, setUserOption] = useState({});
  const [isNewUserOption, setIsNewUserOption] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const queryParameter = useLocation().search;

  // HELPER FUNCTION(INNER)
  const setUserOptionWithLoop = ({ iteratee, value }) => {
    setUserOption({});

    iteratee.forEach((each) => {
      setUserOption((prevState) => {
        return {
          ...prevState,
          [each.questionSeq]: each[value] ?? value,
        };
      });
    });
  };

  // API EVENT FUNCTION
  const fetchQuiz = async ({ shuffle }) => {
    const [quizState, optionHistoryState] = await Promise.allSettled([
      axios.get(`${QUIZ_URI}${queryParameter}`),
      axios.get(`${OPTION_HISTORY_URI}${queryParameter}`, AUTH_HEADER_CONFIG),
    ]);

    if (quizState.status === "rejected") {
      const { message } = quizState.reason.response.data;
      enqueueSnackbar(message, { variant: "error" });
      history.goBack();
      return;
    }

    const quizResponse = quizState.value.data.result;
    setQuiz(shuffle ? shuffleQuiz(quizResponse) : quizResponse);

    if (optionHistoryState.status === "rejected") {
      setIsNewUserOption(true);
      setUserOptionWithLoop({
        iteratee: quiz,
        value: null,
      });
      return;
    }

    const optionHistoryResponse = optionHistoryState.value.data.result;
    setIsNewUserOption(false);
    setUserOptionWithLoop({
      iteratee: optionHistoryResponse,
      value: "questionOptionSeq",
    });
  };

  const handleSubmit = async () => {
    if (!Object.values(userOption).length) {
      enqueueSnackbar("제출할 데이터가 없습니다.", {
        variant: "error",
      });
      history.goBack();
      return;
    }

    if (Object.keys(userOption).length > MAX_QUESTION_COUNT) {
      enqueueSnackbar("에러가 발생했습니다. 새로고침해주세요.", {
        variant: "error",
      });
      return;
    }

    const payload = {
      bulk: userOption,
    };

    try {
      if (isNewUserOption) {
        await axios({
          method: "post",
          url: `${OPTION_HISTORY_URI}${queryParameter}`,
          data: payload,
          ...AUTH_HEADER_CONFIG,
        });
      } else {
        await axios({
          method: "put",
          url: `${OPTION_HISTORY_URI}${queryParameter}`,
          data: payload,
          ...AUTH_HEADER_CONFIG,
        });
      }

      history.push(`${QUIZ_RESULT_PAGE_PATH}${queryParameter}`);
    } catch (error) {
      const { message } = error.response?.data || error;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  const props = useMemo(
    () => ({
      quiz,
      fetchQuiz,
      userOption,
      setUserOption,
      handleSubmit,
      queryParameter,
    }),
    [quiz, userOption, queryParameter]
  );

  return <QuizContext.Provider value={props}>{children}</QuizContext.Provider>;
}
