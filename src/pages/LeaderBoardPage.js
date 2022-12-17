import React, { useState, useEffect, useContext } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,  
} from "@mui/material";
import axios from "axios";
import { format } from "timeago.js";

//INTERNAL IMPORT
import Style from "./page.module.css";
import { Wrapper } from "../components";
import { LEADER_BOARD_URI } from "../constants/api";
import { AuthContext } from "../context/AuthContext";
import NotFoundPage from "./NotFoundPage";

const LeaderBoardPage = () => {
  const [leaderBoards, setLeaderBoards] = useState([]);
  const { userID } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(LEADER_BOARD_URI)
      .then(({ data }) => setLeaderBoards(data.result));
  }, []);

  if (!leaderBoards.length) {
    return (
      <NotFoundPage title="리더보드" message="데이터를 불러오는 중입니다..." />
    );
  }

  return (
    <Wrapper>
      리더보드
      <Wrapper.Body>
        <List>
          {leaderBoards.map((each, index) => {
            const isHistory = userID === each["user_id"];

            return (
              <ListItem
                key={index}
                className={`${isHistory && Style.listHistory}`}
                secondaryAction={
                  <ListItemText secondary={each["quiz_score"]} />
                }
              >
                <ListItemAvatar>
                  <Avatar src={each.image} />
                </ListItemAvatar>

                <ListItemText
                  primary={each["user_id"]}
                  secondary={format(each["updated_at"], "ko_KR")}
                />
              </ListItem>
            );
          })}
        </List>
      </Wrapper.Body>
    </Wrapper>
  );
};

export default LeaderBoardPage;
