import React from "react";
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HistoryIcon from "@mui/icons-material/History";
import BarChartIcon from "@mui/icons-material/BarChart";

// INTERNAL IMPORT
import Style from "./BottomBar.module.css";
import {
  LEADER_BOARD_PAGE_PATH,
  REVIEW_LIST_PAGE_PATH,
  CHART_PAGE_PATH,
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
        icon={<EmojiEventsIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={REVIEW_LIST_PAGE_PATH}
        label="리뷰목록"
        value="reviewList"
        icon={<HistoryIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={CHART_PAGE_PATH}
        label="통계"
        value="chart"
        icon={<BarChartIcon />}
      />
    </BottomNavigation>
  );
}

export default BottomBar;
