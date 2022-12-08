import React, { useState, useEffect } from "react";
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
import { Wrapper } from "../components";
import { LEADER_BOARD_URI } from "../constants/api";

const LeaderBoardPage = () => {
  const [leaderBoards, setLeaderBoards] = useState([]);

  useEffect(() => {
    axios
      .get(LEADER_BOARD_URI)
      .then(({ data }) => setLeaderBoards(data.result));
  }, []);

  if (!leaderBoards.length) {
    return <h3>데이터를 불러오는 중입니다...</h3>;
  }

  return (
    <Wrapper>
      리더보드
      <Wrapper.Body>
        <List>
          {leaderBoards.map((each, index) => (
            <ListItem
              key={index}
              secondaryAction={<ListItemText secondary={each["quiz_score"]} />}
            >
              <ListItemAvatar>
                <Avatar src={each.image} />
              </ListItemAvatar>

              <ListItemText
                primary={each["user_id"]}
                secondary={format(each["updated_at"], "ko_KR")}
              />
            </ListItem>
          ))}
        </List>
      </Wrapper.Body>
    </Wrapper>
  );
};

export default LeaderBoardPage;
