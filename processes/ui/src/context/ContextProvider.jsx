import React, { createContext, useState, useMemo } from 'react'
import useToken from '../hooks/useToken'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppContext = createContext();

export const AppProvider = (props) => {
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
    const [loggedIn, setLoggedIn] = useState(false)

    const setNewToken = (token) => {
        setToken(token)
    }

    const toggleLogin = () => {
        setLoggedIn(!loggedIn)
    }

    const success = (message) => {
        toast.dark(message, toastProps)
    }

    const error = (message) => {
        toast.error(message, toastProps)
    }

    return (
        <AppContext.Provider value={{ token, setNewToken, loggedIn, toggleLogin, success, error }}>
            <ToastContainer />
            {props.children}
        </AppContext.Provider>
    )
}
