import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { SnackbarProvider } from "notistack";
import { StyledEngineProvider } from "@mui/material/styles";

// INTERNAL IMPORT
import "./index.css";
import { ChapterProvider } from "./context/ChapterContext";
import { QuizProvider } from "./context/QuizContext";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";

axios.defaults.baseURL = process.env.REACT_APP_HOST;

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider autoHideDuration={2000}>
      <AuthProvider>
        <ChapterProvider>
          <BrowserRouter>
            <QuizProvider>
              <StyledEngineProvider injectFirst>
                <App />
              </StyledEngineProvider>
            </QuizProvider>
          </BrowserRouter>
        </ChapterProvider>
      </AuthProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
