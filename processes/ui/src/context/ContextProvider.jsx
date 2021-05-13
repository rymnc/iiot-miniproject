import React, { createContext, useState, useMemo } from 'react'
import useToken from '../hooks/useToken'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiClient } from '../services/axios'
export const AppContext = createContext();

export const AppProvider = (props) => {

    const validateToken = async (effect) => {
        try {
            await apiClient.get('/auth/validate')
            if (!loggedIn) setLoggedIn(true)
            if (effect) success('Restoring session')
            return true
        } catch (e) {
            setNewToken(undefined)
            toggleLogin(false)
            return false
        }
    }

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

    const toggleLogin = (state) => {
        setLoggedIn(state)
    }

    const success = (message) => {
        toast.dark(message, toastProps)
    }

    const error = (message) => {
        toast.error(message, toastProps)
    }

    return (
        <AppContext.Provider value={{ token, setNewToken, loggedIn, toggleLogin, success, error, validateToken }}>
            <ToastContainer />
            {props.children}
        </AppContext.Provider>
    )
}
