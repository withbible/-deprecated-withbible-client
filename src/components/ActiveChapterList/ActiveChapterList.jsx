import React from "react";
import { Link } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Chip,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// INTERNAL IMPORT
import Style from "./ActiveChapterList.module.css";
import { REVIEW_PAGE_PATH } from "../../constants/route";

function ActiveChapterList({ iteratee, categorySeq }) {
  return (
    <>
      {iteratee.map((each, index) => {
        const queryParameter = `?categorySeq=${categorySeq}&chapterNum=${each.chapterNum}`;
        const chipLabel = `맞힌개수 ${each.hitQuestionCount}/${each.questionCount}`;

        return (
          <div key={index}>
            <ListItem>
              <ListItemButton
                component={Link}
                to={`${REVIEW_PAGE_PATH}${queryParameter}`}
                className={Style.listItemButton}
              >
                <ListItemText primary={`Ch.${each.chapterNum}`} />

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
}

export default ActiveChapterList;
