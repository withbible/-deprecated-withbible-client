import React from "react";
import { format } from "timeago.js";
import { ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";

// INTERNAL IMPORT
import Style from "./LeaderBoard.module.css";

function LeaderBoard({ isHistory, each }) {
  return (
    <ListItem
      className={`${isHistory && Style.listHistory}`}
      secondaryAction={<ListItemText secondary={each.quizScore} />}
    >
      <ListItemAvatar>
        <Avatar src={each.image} />
      </ListItemAvatar>

      <ListItemText
        primary={each.userID}
        secondary={format(each.updatedAt, "ko_KR")}
      />
    </ListItem>
  );
}

export default LeaderBoard;
