import { useState } from "react";

export default function useUserData() {
  const getUserData = () => {
    const rawData = localStorage.getItem("userData");
    try {
      return JSON.parse(rawData);
    } catch (e) {
      return {};
    }
  };

  const [userData, setUserData] = useState(getUserData());

  const saveUserData = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
    setUserData(data);
  };

  return {
    setUserData: saveUserData,
    userData,
  };
}
