import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

//INTERNAL IMPORT
import { LOGIN_CHECK_URI } from "../constants/api";

LOGIN_CHECK_URI;

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [userID, setUserID] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const fetchLoginCheck = useCallback(async () => {
    try {
      const { data } = await axios.get(LOGIN_CHECK_URI);
      setUserID(data.result["userID"]);
    } catch (error) {
      const message = error.response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    }
  }, [userID]);

  useEffect(() => {
    fetchLoginCheck();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        fetchLoginCheck,
        userID,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
