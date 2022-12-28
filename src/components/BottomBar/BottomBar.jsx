import React from "react";
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import HistoryIcon from "@mui/icons-material/History";

// INTERNAL IMPORT
import Style from "./BottomBar.module.css";
import {
  LEADER_BOARD_PAGE_PATH,
  REVIEW_LIST_PAGE_PATH,
} from "../../constants/route";

function BottomBar() {
  return (
    <BottomNavigation showLabels className={Style.bottomBar}>
      <BottomNavigationAction
        component={Link}
        to="/"
        label="홈"
        value="home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={LEADER_BOARD_PAGE_PATH}
        label="리더보드"
        value="leaderBoard"
        icon={<LeaderboardIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={REVIEW_LIST_PAGE_PATH}
        label="리뷰목록"
        value="reviewList"
        icon={<HistoryIcon />}
      />
    </BottomNavigation>
  );
}

export default BottomBar;
