import React, { useState, useEffect } from "react";
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
import { CATEGORIES_HIT_COUNT_URI } from "../constants/api";
import { AUTH_HEADER_CONFIG } from "../constants/config";
import NotFoundPage from "./NotFoundPage";

function HitCountPage() {
  const [hitCountList, setHitCountList] = useState([]);

  const fetchHitCount = async () => {
    try {
      const { data } = await axios.get(
        CATEGORIES_HIT_COUNT_URI,
        AUTH_HEADER_CONFIG
      );

      setHitCountList(data.result);
    } catch (error) {
      const { message } = error.response?.data || error;
    }
  };

  useEffect(() => {
    fetchHitCount();
  }, []);

  if (!hitCountList.length) {
    return (
      <NotFoundPage
        title="카테고리별 맞힌갯수"
        message="데이터가 존재하지 않습니다."
      />
    );
  }

  return (
    <Wrapper>
      <Wrapper.Header>카테고리별 맞힌갯수</Wrapper.Header>
      <Wrapper.Body>
        {CATEGORY[hitCountList[0].categorySeq]}

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={hitCountList[0].chapterNumArray}
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
            <Line type="monotone" dataKey="hitQuestionCount" stroke="#444" />
          </LineChart>
        </ResponsiveContainer>
      </Wrapper.Body>
    </Wrapper>
  );
}

export default HitCountPage;
