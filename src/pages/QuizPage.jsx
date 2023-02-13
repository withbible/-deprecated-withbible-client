import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, FormControlLabel, Switch } from "@mui/material";
import queryString from "query-string";

// INTERNAL IMPORT
import Style from "./page.module.css";
import {
  ButtonBox,
  EditButtonBox,
  QuestionBox,
  EditQuestionBox,
  OptionList,
  EditOptionList,
  StepperBar,
  Wrapper,
} from "../components";
import { ADMIN_USER_ID } from "../constants/config";
import { CATEGORY } from "../constants/enum";
import { AuthContext } from "../contexts/AuthContext";
import { QuizContext } from "../contexts/QuizContext";
import { getIllustNumbers, getTotalStep } from "../utils/util";
import NotFoundPage from "./NotFoundPage";

function QuizPage() {
  const { userID } = useContext(AuthContext);
  const { quiz, fetchQuiz, queryParameter } = useContext(QuizContext);
  const [activeStep, setActiveStep] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [editQuiz, setEditQuiz] = useState(quiz[activeStep]);
  const [illustNumbers] = useState(() => getIllustNumbers(quiz.length));
  const { categorySeq, chapterNum } = queryString.parse(queryParameter);

  /**
   * @todo 이전 퀴즈가 잠깐 보이는 이슈
   */
  useEffect(() => {
    fetchQuiz({ shuffle: true });
  }, [queryParameter]);

  useEffect(() => {
    setEditQuiz(quiz[activeStep]);
  }, [quiz, activeStep]);

  if (!quiz.length) {
    return (
      <NotFoundPage
        title={`${CATEGORY[categorySeq]} Ch.${chapterNum}`}
        message="데이터를 불러오는 중입니다..."
      />
    );
  }

  return (
    <Wrapper>
      <Wrapper.Header className={Style.flexDirectionColumn}>
        <Box className={Style.editModeContainer}>
          <Typography>
            {CATEGORY[categorySeq]} Ch.{chapterNum}
          </Typography>

          {userID === ADMIN_USER_ID ? (
            <FormControlLabel
              className={Style.rightSideButtonContainer}
              control={
                <Switch onChange={(event) => setIsEdit(event.target.checked)} />
              }
              label="수정모드"
            />
          ) : null}
        </Box>

        <StepperBar
          iteratee={[...quiz.keys()]}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </Wrapper.Header>

      <Wrapper.Body>
        {isEdit ? (
          <EditQuestionBox
            question={editQuiz.question}
            questionSub={editQuiz.questionSub}
            setEditQuiz={setEditQuiz}
          />
        ) : (
          <QuestionBox
            question={quiz[activeStep].question}
            questionSub={quiz[activeStep].questionSub}
            illustNumber={illustNumbers[activeStep]}
          />
        )}

        {isEdit ? (
          <EditOptionList
            iteratee={editQuiz.optionArray}
            editQuiz={editQuiz}
            setEditQuiz={setEditQuiz}
          />
        ) : (
          <OptionList
            questionSeq={quiz[activeStep].questionSeq}
            iteratee={quiz[activeStep].optionArray}
          />
        )}

        {isEdit ? (
          <EditButtonBox
            isFirst={activeStep === 0}
            isLast={activeStep === getTotalStep(quiz.length)}
            setActiveStep={setActiveStep}
            editQuiz={editQuiz}
          />
        ) : (
          <ButtonBox
            isFirst={activeStep === 0}
            isLast={activeStep === getTotalStep(quiz.length)}
            setActiveStep={setActiveStep}
          />
        )}
      </Wrapper.Body>
    </Wrapper>
  );
}

export default QuizPage;
