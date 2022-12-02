import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

//INTERNAL IMPORT
import "./index.css";
import App from "./App";
import { ChapterSearchProvider } from "./context/ChapterSearchContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChapterSearchProvider>
        <App />
      </ChapterSearchProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
