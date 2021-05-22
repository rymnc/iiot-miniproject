import { useState } from "react";

export default function useDeviceData() {
  const getDeviceData = () => {
    const rawData = localStorage.getItem("deviceData");
    try {
      return JSON.parse(rawData);
    } catch (e) {
      return [];
    }
  };

  const [deviceData, setDeviceData] = useState(getDeviceData());

  const saveDeviceData = (data) => {
    localStorage.setItem("deviceData", JSON.stringify(data));
    setDeviceData(data);
  };

  return {
    setDeviceData: saveDeviceData,
    deviceData,
  };
}
