import React from "react";
import {
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

//INTERNAL IMPORT
import { REVIEW_PAGE_PATH } from "../../constants/route";

const ActiveChapterList = ({ iteratee, category, categorySeq }) => {  
  return (
    <>
      <ListSubheader>{category}</ListSubheader>

      {iteratee.map((each, index) => {
        const queryParameter = `?categorySeq=${categorySeq}&chapterSeq=${each}`;

        return (
          <ListItem key={index}>
            <ListItemButton href={`${REVIEW_PAGE_PATH}${queryParameter}`}>
              <ListItemText primary={`${category} ch.${each}`} />
              <KeyboardArrowRightIcon />
            </ListItemButton>
          </ListItem>
        );
      })}
    </>
  );
};

export default ActiveChapterList;
