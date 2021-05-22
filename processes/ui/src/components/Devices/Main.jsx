import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import SearchBar from "./SearchBar";
import Headings from "./Headings";
import AllDevices from "./AllDevices";
import { DeviceContext } from "./DeviceContext";

const Main = () => {
  const { deviceData } = useContext(DeviceContext);

  return (
    <>
      {deviceData.length === 0 ? (
        <h4>
          Looks like you have no devices!
          <br /> Press the "+" button to add one!
        </h4>
      ) : null}
      <SearchBar />
      <Table
        striped
        bordered
        hover
        responsive="sm"
        className="rounded"
        size="sm"
      >
        <thead>
          <tr>{deviceData.length > 0 ? <Headings /> : null}</tr>
        </thead>
        <tbody>
          <AllDevices />
        </tbody>
      </Table>
    </>
  );
};

export default Main;
