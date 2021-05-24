import React, { useContext, useEffect } from "react";
import { Image } from "react-bootstrap";
import { apiClient } from "../../services/axios";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../context/ContextProvider";
import "../height.css"

const Home = () => {
  const { success, error } = useContext(AppContext);

  useEffect(() => {
    const pingBackend = async () => {
      try {
        const { data } = await apiClient.get("/health");
        if (data.healthy === true) {
          console.log("Connected to API");
        } else {
          error("Something went wrong while connecting to the API");
        }
      } catch (e) {
        error("Something went wrong while connecting to the API");
      }
    };
    pingBackend();
  }, [error, success]);

  return (
    <div id="main" >
      <Image src={'./white_logo_transparent.png'} className="logo" />
    </div>
  );
};

export default Home;
