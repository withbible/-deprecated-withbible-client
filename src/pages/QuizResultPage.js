import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Link,
} from "@mui/material";
import Confetti from "react-dom-confetti";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

//INTERNAL IMPORT
import Style from "./QuizResultPage.module.css";
import { Wrapper } from "../components";
import { QUIZ_URI } from "../constants/api";

const QuizResultPage = () => {
  const { categorySeq, chapterSeq } = queryString.parse(useLocation().search);
  const [activeState, setActiveStep] = useState(false);  

  useEffect(() => {
    setActiveStep(true);
  }, []);

  return (
    <Wrapper>
      <Typography>퀴즈결과</Typography>
      <Confetti active={activeState} config={confettiConfig} />

      <Wrapper.Body>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Card className={Style.gridItem}>
              <CardContent>
                <Typography variant="inherit" color="text.secondary">
                  ch.{chapterSeq} 맞힌 갯수
                </Typography>
                <Typography variant="h5">1/3</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card className={Style.gridItem}>
              <CardContent>
                <Typography variant="inherit" color="text.secondary">
                  카테고리{categorySeq} 진행률
                </Typography>
                <Typography variant="h5">20%</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box className={Style.buttonContainer}>
          <Button>
            <Link href={`${QUIZ_URI}${useLocation().search}`}>다시풀기</Link>
          </Button>
          <Button>
            <Link>리뷰</Link>
          </Button>
        </Box>
      </Wrapper.Body>
    </Wrapper>
  );
};

export default QuizResultPage;

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
