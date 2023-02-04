import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
} from "@mui/material";
import Confetti from "react-dom-confetti";

// INTERNAL IMPORT
import Style from "./page.module.css";
import { Wrapper } from "../components";
import { HIT_COUNT_URI, ACTIVE_CHAPTER_COUNT_URI } from "../constants/api";
import { AUTH_HEADER_CONFIG } from "../constants/config";
import { CATEGORY } from "../constants/enum";
import { QUIZ_PAGE_PATH, REVIEW_PAGE_PATH } from "../constants/route";
import { QuizContext } from "../contexts/QuizContext";
import NotFoundPage from "./NotFoundPage";

// CONFIG
const confettiConfig = {
  angle: 90,
  spread: 200,
  startVelocity: 30,
  elementCount: 200,
  dragFriction: 0.12,
  duration: 3000,
  width: "1rem",
  height: "1rem",
  perspective: "50rem",
  colors: [
    "var(--primary-color)",
    "var(--accent-color)",
    "var(--shadow-color)",
  ],
};

// HELPER FUNCTION
function getPercent(part, total) {
  return Math.round((part / total) * 100);
}

// MAIN
function QuizResultPage() {
  const { queryParameter } = useContext(QuizContext);
  const [quizResult, setQuizResult] = useState({
    hitCount: {},
    activeCount: {},
  });
  const [activeState, setActiveState] = useState(false);
  const { categorySeq, chapterNum } = queryString.parse(queryParameter);

  const fetchQuizResult = async () => {
    const [hitCountState, activeCountState] = await Promise.all([
      axios.get(`${HIT_COUNT_URI}${queryParameter}`, AUTH_HEADER_CONFIG),
      axios.get(
        `${ACTIVE_CHAPTER_COUNT_URI}?categorySeq=${categorySeq}`,
        AUTH_HEADER_CONFIG
      ),
    ]);

    const hitCount = hitCountState.data.result;
    const activeCount = activeCountState.data.result;

    setQuizResult({ hitCount, activeCount });
  };

  useEffect(() => {
    fetchQuizResult();
  }, []);

  useEffect(() => {
    setActiveState(true);
  }, []);

  if (!Object.keys(quizResult).length) {
    return (
      <NotFoundPage title="퀴즈결과" message="데이터를 불러오는 중입니다..." />
    );
  }

  return (
    <Wrapper>
      <Wrapper.Header>퀴즈결과</Wrapper.Header>

      <Wrapper.Body>
        <Confetti active={activeState} config={confettiConfig} />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Card className={Style.gridItem}>
              <CardContent>
                <Typography variant="inherit" color="text.secondary">
                  Ch.{chapterNum} 맞힌 갯수
                </Typography>
                <Typography variant="h5">
                  {quizResult.hitCount.hitQuestionCount}/
                  {quizResult.hitCount.questionCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card className={Style.gridItem}>
              <CardContent>
                <Typography variant="inherit" color="text.secondary">
                  {CATEGORY[categorySeq]} 진행률
                </Typography>
                <Typography variant="h5">
                  {getPercent(
                    quizResult.activeCount.activeChapterCount,
                    quizResult.activeCount.maxChapter
                  )}
                  %
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box className={Style.buttonContainer}>
          <Button component={Link} to={`${QUIZ_PAGE_PATH}${queryParameter}`}>
            다시풀기
          </Button>
          <Button component={Link} to={`${REVIEW_PAGE_PATH}${queryParameter}`}>
            리뷰
          </Button>
        </Box>
      </Wrapper.Body>
    </Wrapper>
  );
}

export default QuizResultPage;
