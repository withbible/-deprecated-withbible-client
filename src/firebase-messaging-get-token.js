import { initializeApp } from "firebase/app";

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
