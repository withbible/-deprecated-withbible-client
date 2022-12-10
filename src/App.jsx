import React from "react";
import { Switch, Route } from "react-router-dom";

//INTERNAL IMPORT
import {
  SIGN_IN_PATH,  
  QUIZ_PAGE_PATH,
  QUIZ_RESULT_PAGE_PATH,
  LEADER_BOARD_PAGE_PATH,
  REVIEW_LIST_PAGE_PATH,
  REVIEW_PAGE_PATH,
} from "./constants/route";
import { BottomBar } from "./components";
import MainPage from "./pages/MainPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import QuizPage from "./pages/QuizPage";
import QuizResultPage from "./pages/QuizResultPage";
import ReviewListPage from "./pages/ReviewListPage";
import ReviewPage from "./pages/ReviewPage";
import SignInPage from "./pages/SignInPage";

const App = () => {
  return (
    <>
      <Switch>
        <Route path={SIGN_IN_PATH} component={SignInPage} />
        <Route path={REVIEW_PAGE_PATH} component={ReviewPage} />
        <Route path={REVIEW_LIST_PAGE_PATH} component={ReviewListPage} />
        <Route path={QUIZ_RESULT_PAGE_PATH} component={QuizResultPage} />
        <Route path={QUIZ_PAGE_PATH} component={QuizPage} />
        <Route path={LEADER_BOARD_PAGE_PATH} component={LeaderBoardPage} />
        <Route path="/" component={MainPage} />
      </Switch>

      <BottomBar />
    </>
  );
};

export default App;
