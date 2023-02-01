import React from "react";
import { Switch, Route } from "react-router-dom";

// INTERNAL IMPORT
import "./firebase-messaging-get-token";
import "./pusher-subscribe";
import {
  SIGNUP_PATH,
  LOGIN_PATH,
  QUIZ_PAGE_PATH,
  QUIZ_RESULT_PAGE_PATH,
  LEADER_BOARD_PAGE_PATH,
  REVIEW_LIST_PAGE_PATH,
  REVIEW_PAGE_PATH,
  CHART_PAGE_PATH,
} from "./constants/route";
import {
  LeaderBoardPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  QuizPage,
  QuizResultPage,
  ReviewListPage,
  ReviewPage,
  SignupPage,
  ChartPage,
} from "./pages";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path={SIGNUP_PATH} component={SignupPage} />
      <Route path={LOGIN_PATH} component={LoginPage} />
      <Route exact path={QUIZ_PAGE_PATH} component={QuizPage} />
      <Route exact path={QUIZ_RESULT_PAGE_PATH} component={QuizResultPage} />
      <Route path={LEADER_BOARD_PAGE_PATH} component={LeaderBoardPage} />
      <Route exact path={REVIEW_LIST_PAGE_PATH} component={ReviewListPage} />
      <Route exact path={REVIEW_PAGE_PATH} component={ReviewPage} />
      <Route exact path={CHART_PAGE_PATH} component={ChartPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default App;
