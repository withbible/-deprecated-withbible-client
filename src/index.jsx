import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import axios from "axios";

//INTERNAL IMPORT
import "./index.css";
import App from "./App";
import { ChapterProvider } from "./context/ChapterContext";
import { QuizProvider } from "./context/QuizContext";
import { AuthProvider } from "./context/AuthContext";

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
