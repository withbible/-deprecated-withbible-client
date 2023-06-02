import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// INTERNAL IMPORT
import { Wrapper } from "../components";
import { CATEGORY } from "../constants/enum";
import { AVG_HIT_COUNT_PATH } from "../constants/api";
import { AUTH_HEADER_CONFIG } from "../constants/config";
import { ChapterContext } from "../contexts/ChapterContext";
import NotFoundPage from "./NotFoundPage";
import { pusher } from "../pusher";

// HELPER FUNCTION
function mergeWithCategory(avgHitCountList, hitCountList) {
  const result = [...avgHitCountList];

  hitCountList.forEach((hitCount) => {
    const categoryIdx = hitCount.categorySeq - 1;

    if (hitCount.categorySeq === avgHitCountList[categoryIdx].categorySeq) {
      hitCount.chapterNumArray.forEach((each) => {
        const chapterIdx = each.chapterNum - 1;

        if (
          each.chapterNum ===
          avgHitCountList[categoryIdx].chapterNumArray[chapterIdx].chapterNum
        ) {
          result[categoryIdx].chapterNumArray[chapterIdx] = {
            ...result[categoryIdx].chapterNumArray[chapterIdx],
            ...each,
          };
        }
      });
    }
  });

  return result;
}

function ChartPage() {
  const { activeChapter } = useContext(ChapterContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [chartData, setChartData] = useState([]);

  const fetchHitCount = async () => {
    setErrorMessage("");

    try {
      const { data } = await axios.get(AVG_HIT_COUNT_PATH, AUTH_HEADER_CONFIG);

      setChartData(mergeWithCategory(data.result, activeChapter));
    } catch (error) {
      const { message } = error.response?.data || error;
      setErrorMessage(message);
    }
  };

  useEffect(() => {
    fetchHitCount();

    const channel = pusher.subscribe("quiz-interaction-channel");

    channel.bind("quiz-interaction-event", (data) => {
      setChartData(mergeWithCategory(data.result, activeChapter));
    });

    channel.bind("error", (error) => {
      const { message } = error.response?.data || error;
      setErrorMessage(message);
    });
  }, []);

  if (errorMessage) {
    return <NotFoundPage title="맞힌 평균개수 통계" message={errorMessage} />;
  }

  return (
    <Wrapper>
      <Wrapper.Header>맞힌 평균개수 통계</Wrapper.Header>
      <Wrapper.Body>
        {chartData.map((each) => {
          return (
            <div key={each.categorySeq}>
              {CATEGORY[each.categorySeq]}

              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                  data={each.chapterNumArray}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="chapterNum" />
                  <YAxis dataKey="questionCount" />
                  <Tooltip
                    labelFormatter={(value) => {
                      return `Ch.${value}`;
                    }}
                  />

                  <Bar
                    fill="#444"
                    name="맞힌 평균개수"
                    dataKey="avgHitQuestionCount"
                  />

                  <Bar
                    fill="#FBCE7B"
                    name="내가 맞힌개수"
                    dataKey="hitQuestionCount"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </Wrapper.Body>
    </Wrapper>
  );
}

export default ChartPage;
