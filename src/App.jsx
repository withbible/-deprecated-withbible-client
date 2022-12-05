import React from "react";
import { Switch, Route } from "react-router-dom";

//INTERNAL IMPORT
import MainPage from "./pages/MainPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import QuizPage from "./pages/QuizPage";
import BottomBar from "./components/BottomBar/BottomBar";

function App() {
  return (
    <>      
      <Switch>        
        <Route path="/quiz/:categorySeq/:chapterSeq" component={QuizPage} />
        <Route path="/leaderBoard" component={LeaderBoardPage} />
        <Route path="/" component={MainPage} />
      </Switch>

      <BottomBar />
    </>
  );
}

export default App;
