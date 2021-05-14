import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import useToken from "../hooks/useToken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiClient } from "../services/axios";
import { useHistory } from "react-router-dom";
export const AppContext = createContext();

export const AppProvider = (props) => {
  const history = useHistory();

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

  const { token, setToken } = useToken();
  const [loggedIn, setLoggedIn] = useState(null);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validateToken = async (effect) => {
    try {
      const { data } = await apiClient.get("/auth/validate");
      return data;
    } catch (e) {
      setNewToken(undefined);
      toggleLogin(false);
      return false;
    }
  };

  useEffect(() => {
    const validate = async () => {
      const valid = await validateToken(false);
      setLoggedIn(valid);
    };
    validate();
  }, [history, validateToken]);

  return (
    <AppContext.Provider
      value={{ token, setNewToken, loggedIn, toggleLogin, success, error }}
    >
      <ToastContainer />
      {props.children}
    </AppContext.Provider>
  );
};
