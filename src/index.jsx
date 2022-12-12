import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

//INTERNAL IMPORT
import "./index.css";
import App from "./App";
import { ChapterSearchProvider } from "./context/ChapterSearchContext";
import { QuizProvider } from "./context/QuizContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider autoHideDuration={2000}>
        <AuthProvider>
          <ChapterSearchProvider>
            <QuizProvider>
              <StyledEngineProvider injectFirst>
                <App />
              </StyledEngineProvider>
            </QuizProvider>
          </ChapterSearchProvider>
        </AuthProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
