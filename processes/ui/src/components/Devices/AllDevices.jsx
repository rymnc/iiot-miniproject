import React, { useContext } from "react";
import Device from "./Device";
import { apiClient } from "../../services/axios";
import { AppContext } from "../../context/ContextProvider";
import { DeviceContext } from "./DeviceContext";
import * as relation from './headerColumn.json'

const Devices = () => {
  const { deviceData, addNewDevice: updateList, headings } = useContext(DeviceContext);

  const { success, error } = useContext(AppContext);

  const deleteDevice = async (deviceId) => {
    try {
      const { data } = await apiClient.delete(
        `/devices/delete?deviceId=${deviceId}`
      );
      if (data === true) {
        success("Successfully deleted device!");
        await updateList();
      } else throw new Error("Could not delete the device!");
    } catch (e) {
      error(e?.response?.data || e.message);
    }
  };

  return (
    deviceData &&
    deviceData.map((device, i) => {
      const filteredItems = Object.keys(device)
        .filter((field) => {
          return headings.filter((h) => h[1] === true).map((h) => h[0]).includes(relation.default[field])
        })
      console.log('filtered:', filteredItems)
      const deviceObj = {}
      filteredItems.forEach((item) => deviceObj[item] = device[item])
      return (
        <Device {...deviceObj} key={device.deviceId} deleteDevice={deleteDevice} />
      );
    })
  );
};

export default Devices;
