import React, { useContext } from "react";
import { memoize } from "lodash";
import { Button } from "react-bootstrap";
import { AppContext } from "../../context/ContextProvider";
import { apiClient } from "../../services/axios";
import * as relation from "./headerColumn.json";

const getKeyByValue = memoize((value, object) => {
  return Object.keys(object).find((key) => object[key] === value);
});

const getPayload = memoize((headings, where) => {
  // **WARNING**
  // THIS IS BAD CODE
  // DESIGNED TO DEMO AN SQL INJECTION
  const selectedHeadings = headings
    .filter((headings) => headings[1] === true)
    .map(([headings]) => headings)
    .map((heading) => getKeyByValue(heading, relation.default))
    .map((heading) => `"${heading}"`)
    .join(",");

  return {
    columns: [selectedHeadings],
    where,
  };
});

const DownloadList = ({ headings, where }) => {
  const { success, error } = useContext(AppContext);

  const downloadHandler = async (e) => {
    e.preventDefault();
    try {
      const payload = getPayload(headings, where);
      const { data } = await apiClient.post("/devices/some", payload, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(data);
      let a = document.createElement("a");
      a.href = url;
      a.download = "myDevices.json";
      a.click();
      success("Downloaded device data!");
    } catch (e) {
      error(e?.response?.message || "Could not download device data!");
    }
  };

  return (
    <>
      <p className="mt-2 mb-0">
        {" "}
        You can also download a list of all your devices
      </p>
      <Button variant="outline-info" onClick={downloadHandler}>
        Download
      </Button>
    </>
  );
};

export default DownloadList;
