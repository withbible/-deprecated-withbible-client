import React from "react";
import { Switch, Route } from "react-router-dom";

//INTERNAL IMPORT
import {
  QUIZ_PAGE_PATH,
  QUIZ_RESULT_PAGE_PATH,
  LEADER_BOARD_PAGE_PATH,
  REVIEW_LIST_PAGE_PATH
} from "./constants/route";
import { BottomBar } from "./components";
import MainPage from "./pages/MainPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import QuizPage from "./pages/QuizPage";
import QuizResultPage from "./pages/QuizResultPage";
import ReviewListPage from "./pages/ReviewListPage";

function App() {
  return (
    <>
      <Switch>
        <Route path={REVIEW_LIST_PAGE_PATH} component={ReviewListPage} />
        <Route path={QUIZ_RESULT_PAGE_PATH} component={QuizResultPage} />
        <Route path={QUIZ_PAGE_PATH} component={QuizPage} />
        <Route path={LEADER_BOARD_PAGE_PATH} component={LeaderBoardPage} />
        <Route path="/" component={MainPage} />
      </Switch>

      <BottomBar />
    </>
  );
}

export default App;
