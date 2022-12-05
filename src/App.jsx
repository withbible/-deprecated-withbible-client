import React from "react";
import { Switch, Route } from "react-router-dom";

//INTERNAL IMPORT
import MainPage from "./pages/MainPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";

function App() {
  return (
    <>      
      <Switch>        
        <Route path="/leaderBoard" component={LeaderBoardPage} />
        <Route path="/" component={MainPage} />
      </Switch>
    </>
  );
}

export default App;
