import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { List } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";

//INTERNAL IMPORT
import { LeaderBoard, Wrapper } from "../components";
import { LEADER_BOARD_PAGE_URI } from "../constants/api";
import { AuthContext } from "../context/AuthContext";

const LIMIT = 7;

const LeaderBoardPage = () => {
  const { userID } = useContext(AuthContext);
  const [leaderBoards, setLeaderBoards] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const page = useRef(1);
  const observerTarget = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const fetchLeadrBoard = useCallback(async () => {
    try {
      const queryParameter = `?limit=${LIMIT}&page=${page.current}`;
      const { data } = await axios.get(
        `${LEADER_BOARD_PAGE_URI}${queryParameter}`
      );

      setLeaderBoards((prevState) => [...prevState, ...data.result]);
      setHasNextPage(data.result.length === LIMIT);

      if (data.result.length) {
        page.current += 1;
      }
    } catch (error) {
      const message = error.response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    }
  }, [page.current]);

  useEffect(() => {
    if (!observerTarget.current || !hasNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchLeadrBoard();
      } 
    });

    observer.observe(observerTarget.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage]);

  return (
    <Wrapper>
      리더보드
      <Wrapper.Body>
        <List>
          {leaderBoards?.map((each, index) => (
            <LeaderBoard
              key={index}
              isHistory={userID === each["user_id"]}
              each={each}
            />
          ))}
          <div ref={observerTarget} />
        </List>
      </Wrapper.Body>
    </Wrapper>
  );
};

export default LeaderBoardPage;
