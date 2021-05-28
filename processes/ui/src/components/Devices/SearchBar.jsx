import React, { useContext, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Modal from "../Modal";
import AddDevice from "./AddDevice";
import Filters from "./Filters";
import { DeviceContext } from "./DeviceContext";

const SearchBar = () => {
  const { addNewDevice } = useContext(DeviceContext);
  const [show, setShow] = useState(false);

  const addStyle = {
    textAlign: "-webkit-right",
  };

  return (
    <Container className="mb-3">
      <Row>
        <Col>
          <Filters />
        </Col>
        <Col style={addStyle}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShow(true)}
            className="rounded"
          >
            <img
              src="https://img.icons8.com/android/24/ffffff/plus.png"
              alt="Plus Symbol"
            />
          </Button>
          <Modal
            show={show}
            onHide={() => setShow(false)}
            size={"lg"}
            title={"Add a Device"}
            body={
              <AddDevice
                onHide={() => setShow(false)}
                addNewDevice={addNewDevice}
              />
            }
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
