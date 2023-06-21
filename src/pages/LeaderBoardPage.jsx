import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { List } from "@mui/material";

// INTERNAL IMPORT
import { LeaderBoard, Wrapper } from "../components";
import { AuthContext } from "../contexts/AuthContext";
import { LEADER_BOARD_PAGE_PATH } from "../constants/api";
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
    setErrorMessage("");

    try {
      const path = `${LEADER_BOARD_PAGE_PATH}?limit=${limit}&page=${page.current}`;
      const { data } = await axios.get(path);

      setLeaderBoards((prevState) => [...prevState, ...data.result]);

      if (data.meta.links.at(-1).link === path) {
        setHasNextPage(false);
      } else {
        setHasNextPage(true);
        page.current += 1;
      }
    } catch (error) {
      const { message } = error.response?.data || error;
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
      <Wrapper.Header>리더보드</Wrapper.Header>
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
