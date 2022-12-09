import React, { useState, useEffect } from "react";
import {
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import axios from "axios";

//INTERNAL IMPORT
import Style from "./ReviewListPage.module.css";
import { Wrapper } from "../components";
import { ACTIVE_CHAPTER_URI } from "../constants/api";

const ReviewListPage = () => {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    axios
      .get(ACTIVE_CHAPTER_URI)
      .then(({ data }) => setReviewList(data.result));
  }, []);

  if (!reviewList.length) {
    return <h3>데이터를 불러오는 중입니다...</h3>;
  }

  return (
    <Wrapper>
      리뷰목록
      <Wrapper.Body>
        <List className={Style.reviewListContainer}>
          {reviewList.map((each, index) => {
            const category = each["category"];

            return (
              <div key={index}>
                <ListSubheader className={Style.listSubHeader}>{category}</ListSubheader>

                {each["chapter_seq_array"].map((each, index) => (
                  <ListItem key={index}>
                    <ListItemButton>
                      <ListItemText primary={`${category} ch.${each}`} />
                      <KeyboardArrowRightIcon/>
                    </ListItemButton>
                  </ListItem>
                ))}
              </div>
            );
          })}
        </List>
      </Wrapper.Body>
    </Wrapper>
  );
};

export default ReviewListPage;
