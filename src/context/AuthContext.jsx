import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

//INTERNAL IMPORT
import { LOG_IN_CHECK_URI } from "../constants/api";
import { AUTH_HEADER_CONFIG } from "../constants/config";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [userID, setUserID] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const fetchLoginCheck = async () => {
    try {
      const { data } = await axios.get(LOG_IN_CHECK_URI, AUTH_HEADER_CONFIG);
      setUserID(data.result["userID"]);
    } catch (error) {
      const message = error.response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchLoginCheck();
  }, [userID]);

  return (
    <AuthContext.Provider
      value={{
        fetchLoginCheck,
        userID,
        setUserID,
        payLoadReducer,
        payLoadValidityReducer,
        isAllValid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const payLoadReducer = (state, action) => {
  const { name, value } = action.type;
  return {
    ...state,
    [name]: value,
  };
};

const payLoadValidityReducer = (state, action) => {
  let isValid = false;

  switch (action.type) {
    case "VALIDATE_USER_NAME":
      isValid = action.payload.userName.match(/^[ㄱ-ㅎ가-힇A-Z-a-z]+$/)
        ? true
        : false;
      return {
        ...state,
        userNameError: !isValid,
      };
    case "VALIDATE_USER_ID":
      isValid = action.payload.userID.match(/^[a-zA-Z0-9]+$/) ? true : false;
      return {
        ...state,
        userIDError: !isValid,
      };
    case "VALIDATE_PASSWORD":
      isValid = action.payload.password.length >= 6;
      return {
        ...state,
        passwordError: !isValid,
      };
    default:
      return state;
  }
};

function isAllValid(payloadValidity) {
  return Object.values(payloadValidity).every((each) => each === false);
}
