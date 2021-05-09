import React, { useEffect, useMemo } from "react";
import { Container } from "react-bootstrap";
import { apiClient } from "../../services/axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
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

  useEffect(() => {
    const pingBackend = async () => {
      try {
        const { data } = await apiClient.get("/health");
        if (data.healthy === true) {
          toast.dark("Connected to API", toastProps);
        } else {
          toast.error(
            "Something went wrong while connecting to the API",
            toastProps
          );
        }
      } catch (e) {
        toast.error(
          "Something went wrong while connecting to the API",
          toastProps
        );
      }
    };
    pingBackend();
  }, [toastProps]);

  return (
    <div>
      <Container>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Home;
