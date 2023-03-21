import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

// INTERNAL IMPORT
import { LOGIN_CHECK_PATH } from "../constants/api";
import { AUTH_HEADER_CONFIG } from "../constants/config";

// HELPER FUNCTION
function payLoadReducer(state, action) {
  const { name, value } = action.type;

  if (name === "isAutoLogin") {
    return {
      ...state,
      [name]: action.type.checked,
    };
  }

  return {
    ...state,
    [name]: value,
  };
}

function payLoadValidityReducer(state, action) {
  let isValid = false;

  switch (action.type) {
    case "VALIDATE_USER_ID":
      isValid = !!action.value.match(/^[a-zA-Z0-9]+$/);
      return {
        ...state,
        userIDError: !isValid,
      };
    case "VALIDATE_USER_EMAIL":
      isValid = !!action.value.match(
        /^[a-zA-Z0-9]*@[a-zA-Z0-9]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
      );
      return {
        ...state,
        userEmailError: !isValid,
      };
    case "VALIDATE_PASSWORD":
      isValid = action.value.length >= 6;
      return {
        ...state,
        passwordError: !isValid,
      };
    default:
      return state;
  }
}

function isAllValid(payloadValidity) {
  return Object.values(payloadValidity).every((each) => each === false);
}

// MAIN
export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [userID, setUserID] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const fetchLoginCheck = async () => {
    try {
      const { data } = await axios.get(LOGIN_CHECK_PATH, AUTH_HEADER_CONFIG);
      setUserID(data.result.userID);
    } catch (error) {
      const { message } = error.response?.data || error;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchLoginCheck();
  }, []);

  const props = useMemo(
    () => ({
      userID,
      setUserID,
      payLoadReducer,
      payLoadValidityReducer,
      isAllValid,
    }),
    [userID]
  );

  return <AuthContext.Provider value={props}>{children}</AuthContext.Provider>;
}
