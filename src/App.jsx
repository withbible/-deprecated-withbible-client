import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={MainPage} />
      </Switch>
    </>
  );
}

export default App;
