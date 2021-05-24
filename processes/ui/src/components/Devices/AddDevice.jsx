import React, { useContext, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { AppContext } from "../../context/ContextProvider";
import { apiClient } from "../../services/axios";
import Field from "../Signup/Field";

export const TYPES = ["SENSOR", "ASSISTANT", "AUTOMATION", "SECURITY"];

const defaultState = {
  deviceName: "",
  deviceType: TYPES[0],
  healthy: "YES",
};

const AddDevice = ({ addNewDevice, onHide }) => {
  const [validated, setValidated] = useState(false);
  const { success, error } = useContext(AppContext);
  const [state, setState] = useState(defaultState);

  const onFieldChange = (field, e) => {
    setState({ ...state, [field]: e.target.value });
  };

  const addDevice = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
    setValidated(true);
    const { deviceName, deviceType, healthy } = state;
    const payload = {
      deviceName,
      deviceType,
      healthy: healthy === "YES" ? true : false,
    };
    try {
      await apiClient.post("/devices/new", payload);
      success("Added Device!");
      addNewDevice(payload);
      // Quick reset of state
      setState(defaultState);
    } catch (e) {
      error("Error Adding Device!");
    } finally {
      onHide();
    }
  };

  return (
    <Form validated={validated} onSubmit={addDevice}>
      <Row>
        <Col>
          <Field
            state={state.deviceName}
            badFeedback={true}
            goodFeedback={true}
            controlId={"formDeviceName"}
            label={"Device Name"}
            onChange={(e) => onFieldChange("deviceName", e)}
            type={"string"}
            key={"name"}
          />
        </Col>
        <Col>
          <Field
            state={state.deviceType}
            badFeedback={true}
            goodFeedback={true}
            controlId={"formDeviceType"}
            label={"Device Type"}
            onChange={(e) => onFieldChange("deviceType", e)}
            type={"string"}
            key={"type"}
            formOptions={{ as: "select" }}
          >
            {TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </Field>
        </Col>
        <Col>
          <Field
            state={state.healthy}
            badFeedback={true}
            goodFeedback={true}
            controlId={"formDeviceHealth"}
            label={"Healthy?"}
            onChange={(e) => onFieldChange("healthy", e)}
            type={"boolean"}
            key={"healthy"}
            formOptions={{ as: "select" }}
          >
            <option>YES</option>
            <option>NO</option>
          </Field>
        </Col>
      </Row>
      <hr />
      <Row className="my-2" style={{ textAlign: "-webkit-right" }}>
        <Col>
          <Button className="mx-2" variant="outline-primary" type="submit">
            Add Device
          </Button>
          <Button variant="outline-secondary" onClick={onHide}>
            Close
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddDevice;
