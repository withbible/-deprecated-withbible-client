import React from "react";
import { Switch, Route } from "react-router-dom";

//INTERNAL IMPORT
import {
  SIGN_UP_PATH,
  LOG_IN_PATH,
  QUIZ_PAGE_PATH,
  QUIZ_RESULT_PAGE_PATH,
  LEADER_BOARD_PAGE_PATH,
  REVIEW_LIST_PAGE_PATH,
  REVIEW_PAGE_PATH,
} from "./constants/route";
import {
  LeaderBoardPage,
  LogInPage,
  MainPage,
  NotFoundPage,
  QuizPage,
  QuizResultPage,
  ReviewListPage,
  ReviewPage,
  SignUpPage,
} from "./pages";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path={SIGN_UP_PATH} component={SignUpPage} />
      <Route path={LOG_IN_PATH} component={LogInPage} />
      <Route exact path={QUIZ_PAGE_PATH} component={QuizPage} />
      <Route exact path={QUIZ_RESULT_PAGE_PATH} component={QuizResultPage} />
      <Route path={LEADER_BOARD_PAGE_PATH} component={LeaderBoardPage} />
      <Route exact path={REVIEW_LIST_PAGE_PATH} component={ReviewListPage} />
      <Route exact path={REVIEW_PAGE_PATH} component={ReviewPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default App;
