import React, { forwardRef } from "react";
import { ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import { format } from "timeago.js";

//INTERNAL IMPORT
import Style from "./LeaderBoard.module.css";

const LeaderBoard = forwardRef(({ isHistory, each }, ref) => {
  return (
    <ListItem
      ref={ref}
      className={`${isHistory && Style.listHistory}`}
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
  );
});

export default LeaderBoard;
