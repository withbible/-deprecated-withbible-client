import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import queryString from "query-string";

//INTERNAL IMPORT
import { QUIZ_URI, OPTION_HISTORY_URI } from "../constants/api";
import { QUIZ_RESULT_PAGE_PATH } from "../constants/route";

export const QuizContext = React.createContext();

export const QuizProvider = ({ children }) => {
  const [quiz, setQuiz] = useState([]);
  const [userOption, setUserOption] = useState({});
  const [isNewUserOption, setIsNewUserOption] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  // ROUTING
  const queryParameter = useLocation().search;
  const { categorySeq, chapterNum } = queryString.parse(queryParameter);
  const history = useHistory();

  const setUserOptionWithHistory = (optionHistoryResponse) => {
    for (const each of optionHistoryResponse) {
      setIsNewUserOption(false);
      setUserOption((prevState) => {
        return {
          ...prevState,
          [each["question_seq"]]: each["question_option_seq"],
        };
      });
    }
  };

  const setUserOptionWithNull = () => {
    for (const each of quiz) {
      setUserOption((prevState) => {
        return {
          ...prevState,
          [each["question_seq"]]: null,
        };
      });
    }
  };

  const fetchQuiz = async ({ shuffle = true }) => {
    const [quizState, optionHistoryState] = await Promise.allSettled([
      axios.get(`${QUIZ_URI}${queryParameter}`),
      axios.get(`${OPTION_HISTORY_URI}${queryParameter}`),
    ]);

    try {
      if (quizState.status === "rejected") {
        const message = quizState.reason.response.data.message;
        throw new Error(message);
      }
    } catch (error) {      
      const message = error.message;
      enqueueSnackbar(message, { variant: "error" });
      return;
    }

    const quiz = quizState.value.data.result;
    setQuiz(shuffle ? await shuffleQuiz(quiz) : quiz);

    if (!optionHistoryState.value) {
      setUserOptionWithNull();
      return;
    }

    const optionHistoryResponse = optionHistoryState.value.data.result;
    setUserOptionWithHistory(optionHistoryResponse);
  };

  const handleSubmit = async () => {
    const payload = {
      categorySeq,
      chapterNum,
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
      const message = error.response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  const totalStep = () => {
    return Object.keys(quiz).length - 1;
  };

  return (
    <QuizContext.Provider
      value={{
        quiz,
        fetchQuiz,
        userOption,
        setUserOption,
        handleSubmit,
        totalStep,
        queryParameter,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

async function shuffleQuiz(quiz) {
  return shuffleArray(quiz).map((each) => {
    return {
      ...each,
      ["option_array"]: shuffleArray(each["option_array"]),
    };
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return [...array];
}
