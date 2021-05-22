import { useState } from "react";

export default function useAuthStatus() {
  const getAuth = () => {
    const authStatus = localStorage.getItem("authStatus");
    return authStatus === "true" ? true : false;
  };

  const [authStatus, setAuthStatus] = useState(getAuth());

  const saveAuth = (status) => {
    localStorage.setItem("authStatus", status);
    setAuthStatus(status);
  };

  return {
    setAuthStatus: saveAuth,
    authStatus,
  };
}
