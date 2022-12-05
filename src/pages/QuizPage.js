import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
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

  useEffect(() => {
    fetchQuiz();
  }, []);

  if (!data.questionSeqArray.length || !data.optionHistoryArray.length) {
    return <h3>데이터를 불러오는 중입니다...</h3>;
  }

  return (
    <Wrapper>
      카테고리: {categorySeq} (ch. {chapterSeq})
      <Wrapper.Body>
        <div className={Style.questionContainer}>
          <img className={Style.illust} src={illust} />
          <Typography>{data.questionSeqArray[1]["question"]}</Typography>
        </div>
      </Wrapper.Body>
    </Wrapper>
  );
};

export default QuizPage;
