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
import Style from "./LeaderBoardPage.module.css";
import Wrapper from "../components/Wrapper/Wrapper";

const LeaderBoardPage = () => {
  const [leaderBoards, setLeaderBoards] = useState([]);

  const uri = `/leaderBoard`;

  useEffect(() => {
    axios.get(uri).then(({ data }) => setLeaderBoards(data.result));
  }, []);

  if (!leaderBoards.length) {
    return <h3>데이터를 불러오는 중입니다...</h3>;
  }

  return (
    <div className={Style.pageContainer}>
      리더보드
      <Wrapper>
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
                secondary={format(each["updated_at"], "ko")}
              />
            </ListItem>
          ))}
        </List>
      </Wrapper>
    </div>
  );
};

export default LeaderBoardPage;
