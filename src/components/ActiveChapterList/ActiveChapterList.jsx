import React from "react";
import {
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Chip,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";

//INTERNAL IMPORT
import Style from "./ActiveChapterList.module.css";
import { REVIEW_PAGE_PATH } from "../../constants/route";

const ActiveChapterList = ({ iteratee, category, categorySeq }) => {
  return (
    <>
      <ListSubheader>{category}</ListSubheader>

      {iteratee.map((each, index) => {
        const queryParameter = `
            ?categorySeq=${categorySeq}&chapterNum=${each["chapter_num"]}
          `;
        const chipLabel = `
            맞힌갯수 ${each["hit_question_count"]}/${each["question_count"]}
          `;

        return (
          <div key={index}>
            <ListItem>
              <ListItemButton
                component={Link}
                to={`${REVIEW_PAGE_PATH}${queryParameter}`}
                className={Style.listItemButton}
              >
                <ListItemText primary={`Ch.${each["chapter_num"]}`} />
                <KeyboardArrowRightIcon className={Style.listItemIcon} />
                <Chip
                  label={chipLabel}
                  size="small"
                  className={Style.listItemChip}
                />
              </ListItemButton>
            </ListItem>
            <Divider variant="middle" />
          </div>
        );
      })}
    </>
  );
};

export default ActiveChapterList;
