import React from "react";
import { Switch, Route } from "react-router-dom";

//INTERNAL IMPORT
import {
  QUIZ_PAGE_PATH,
  QUIZ_RESULT_PAGE_PATH,
  LEADER_BOARD_PAGE_PATH,
} from "./constants/route";
import MainPage from "./pages/MainPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import QuizPage from "./pages/QuizPage";
import QuizResultPage from "./pages/QuizResultPage";
import { BottomBar } from "./components";

function App() {
  return (
    <>
      <Switch>
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
