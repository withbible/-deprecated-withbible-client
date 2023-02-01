import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// INTERNAL IMPORT
import { Wrapper } from "../components";
import { CATEGORY } from "../constants/enum";
import { AVG_HIT_COUNT_URI } from "../constants/api";
import { AUTH_HEADER_CONFIG } from "../constants/config";
import { ChapterContext } from "../contexts/ChapterContext";
import NotFoundPage from "./NotFoundPage";

function ChartPage() {
  const { activeChapter } = useContext(ChapterContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [hitCount, setHitCount] = useState([]);

  const fetchHitCount = async () => {
    setErrorMessage("");

    try {
      const { data } = await axios.get(AVG_HIT_COUNT_URI, AUTH_HEADER_CONFIG);

      setHitCount(data.result);
    } catch (error) {
      const { message } = error.response?.data || error;
      setErrorMessage(message);
    }
  };

  useEffect(() => {
    fetchHitCount();
  }, []);

  if (errorMessage) {
    return <NotFoundPage title="평균 맞힌갯수 통계" message={errorMessage} />;
  }

  return (
    <Wrapper>
      <Wrapper.Header>평균 맞힌갯수 통계</Wrapper.Header>
      <Wrapper.Body>
        {hitCount.map((each) => (
          <div key={each.categorySeq}>
            {CATEGORY[each.categorySeq]}

            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={each.chapterNumArray}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="chapterNum">
                  <Label value="챕터번호" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="avgHitQuestionCount"
                  stroke="#FBCE7B"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </Wrapper.Body>
    </Wrapper>
  );
}

export default ChartPage;
