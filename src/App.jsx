import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// INTERNAL IMPORT
import { TOEKN_URI } from "./constants/api";
import { AUTH_HEADER_CONFIG } from "./constants/config";
import {
  SIGNUP_PATH,
  LOGIN_PATH,
  QUIZ_PAGE_PATH,
  QUIZ_RESULT_PAGE_PATH,
  LEADER_BOARD_PAGE_PATH,
  REVIEW_LIST_PAGE_PATH,
  REVIEW_PAGE_PATH,
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
} from "./pages";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FCM_API_KEY,
  authDomain: `${process.env.REACT_APP_FCM_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.REACT_APP_FCM_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_FCM_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FCM_SENDER_ID,
  appId: process.env.REACT_APP_FCM_APP_ID,
  measurementId: process.env.REACT_APP_FCM_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);
const messaging = getMessaging();

function App() {
  const handleSubmit = async () => {
    try {
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY,
      });

      const { data } = await axios.get(TOEKN_URI, AUTH_HEADER_CONFIG);
      const existedToken = data.result.token;

      if (!existedToken) {
        await axios({
          method: "post",
          url: TOEKN_URI,
          data: { token },
          ...AUTH_HEADER_CONFIG,
        });
      }

      if (token !== existedToken) {
        /**
         * @todo put 행위
         */
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === "denied") {
        return;
      }

      handleSubmit();
    });
  }, []);

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
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default App;
