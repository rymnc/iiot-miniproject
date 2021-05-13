import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { apiClient } from "../../services/axios";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../context/ContextProvider";

const Home = () => {
  const { success, error } = useContext(AppContext)

  useEffect(() => {
    const pingBackend = async () => {
      try {
        const { data } = await apiClient.get("/health");
        if (data.healthy === true) {
          console.log("Connected to API");
        } else {
          error(
            "Something went wrong while connecting to the API",
          );
        }
      } catch (e) {
        error(
          "Something went wrong while connecting to the API"
        );
      }
    };
    pingBackend();
  }, [error, success]);

  return (
    <div>
      <Container>
      </Container>
    </div>
  );
};

export default Home;
