import React, { createContext, useMemo, useCallback } from "react";
import useToken from "../hooks/useToken";
import useUserData from "../hooks/useUserData";
import useAuthStatus from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiClient } from "../services/axios";
import { useHistory, useLocation } from "react-router-dom";
import useSWR from "swr";
export const AppContext = createContext();

export const AppProvider = (props) => {
  const history = useHistory();
  const { userData, setUserData } = useUserData();
  const { token, setToken } = useToken();
  const { authStatus: loggedIn, setAuthStatus: setLoggedIn } = useAuthStatus();

  const UsePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

  const toastProps = useMemo(() => {
    return {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };
  }, []);

  const setNewToken = (token) => {
    setToken(token);
  };

  const toggleLogin = (state) => {
    setLoggedIn(state);
  };

  const success = useCallback(
    (message) => {
      toast.dark(message, toastProps);
    },
    [toastProps]
  );

  const error = useCallback(
    (message) => {
      toast.error(message, toastProps);
    },
    [toastProps]
  );

  const validator = async (url) => {
    const { data } = await apiClient.get(url);
    setLoggedIn(data);
    if (data === false) {
      if (UsePathname() !== "/") history.push("/login");
    }
  };

  const userDataFetcher = async (url) => {
    try {
      const { data } = await apiClient.get(url);
      setUserData(data);
    } catch (e) {
      if (e?.response?.status === 401) {
        history.push("/login");
        error("Session Expired. Please Re-Login");
      }
    }
  };

  useSWR(loggedIn ? "/users/data" : null, userDataFetcher, {
    refreshInterval: 120000,
  });

  useSWR("/auth/validate", validator, {
    refreshInterval: 120000,
  });

  const updateUserData = (data) => {
    setUserData(data);
  };

  return (
    <AppContext.Provider
      value={{
        token,
        setNewToken,
        loggedIn,
        toggleLogin,
        success,
        error,
        userData,
        updateUserData,
      }}
    >
      <ToastContainer />
      {props.children}
    </AppContext.Provider>
  );
};
