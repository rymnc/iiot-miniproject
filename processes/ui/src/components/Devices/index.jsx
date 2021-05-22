import React from "react";
import { Container, Col, Card } from "react-bootstrap";
import { DeviceProvider } from "./DeviceContext";
import Main from "./Main";

const center = {
  textAlign: "-webkit-center",
  margin: "0",
  position: "absolute",
  top: "50%",
  msTransform: "translateY(-50%)",
  transform: "translateY(-50%)",
};

const Devices = () => {
  return (
    <Container fluid className="align-center" style={center}>
      <Col md={8} xs={12} lg={8} xl={6} sm={12}>
        <Card
          className="p-2 justify-content-center shadow-lg mx-3"
          border="info"
        >
          <DeviceProvider>
            <Main />
          </DeviceProvider>
        </Card>
      </Col>
    </Container>
  );
};

export default Devices;
