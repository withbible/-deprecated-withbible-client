import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from "axios";

// INTERNAL IMPORT
import { TOEKN_URI } from "./constants/api";
import { AUTH_HEADER_CONFIG } from "./constants/config";

// CONFIG
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

(async () => {
  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    return;
  }

  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
    });

    console.log("token: ", token);

    const { data } = await axios.get(TOEKN_URI, AUTH_HEADER_CONFIG);
    const existedToken = data.result.token;

    if (!existedToken) {
      await axios({
        method: "post",
        url: TOEKN_URI,
        data: { token },
        ...AUTH_HEADER_CONFIG,
      });
    } else if (token !== existedToken) {
      await axios({
        method: "put",
        url: TOEKN_URI,
        data: { token },
        ...AUTH_HEADER_CONFIG,
      });
    }
  } catch (error) {
    console.log(error.data);
  }

  onMessage(messaging, (payload) => {
    console.log("메시지가 도착했습니다.", payload);
  });
})();
