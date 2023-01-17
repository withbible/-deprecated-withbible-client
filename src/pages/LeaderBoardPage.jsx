import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { List } from "@mui/material";

// INTERNAL IMPORT
import { LeaderBoard, Wrapper } from "../components";
import { AuthContext } from "../contexts/AuthContext";
import { LEADER_BOARD_PAGE_URI } from "../constants/api";
import NotFoundPage from "./NotFoundPage";

// CONSTANT
const LIST_ITEM_HEIGHT = 74;

function LeaderBoardPage() {
  const { userID } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [leaderBoards, setLeaderBoards] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const page = useRef(1);
  const observerTarget = useRef(null);
  const limit = Math.round(window.innerHeight / LIST_ITEM_HEIGHT);

  const fetchLeadrBoard = async () => {
    try {
      const queryParameter = `?limit=${limit}&page=${page.current}`;
      const { data } = await axios.get(
        `${LEADER_BOARD_PAGE_URI}${queryParameter}`
      );

      setLeaderBoards((prevState) => [...prevState, ...data.result]);
      setHasNextPage(data.result.length === limit);

      if (data.result.length) {
        page.current += 1;
      }
    } catch (error) {
      const { message } = error || error.response.data;
      setErrorMessage(message);
    }
  };

  useEffect(() => {
    if (!observerTarget.current || !hasNextPage) {
      return false;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchLeadrBoard();
      }
    });

    observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [hasNextPage]);

  if (errorMessage) {
    return <NotFoundPage title="리더보드" message={errorMessage} />;
  }

  return (
    <Wrapper>
      리더보드
      <Wrapper.Body>
        <List>
          {leaderBoards.map((each, index) => (
            <LeaderBoard
              key={index}
              isHistory={userID === each.userID}
              each={each}
            />
          ))}
          <div ref={observerTarget} />
        </List>
      </Wrapper.Body>
    </Wrapper>
  );
}

export default LeaderBoardPage;
