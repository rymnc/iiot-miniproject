import React, { useState } from "react";
import { Button, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const Device = ({
  deviceId,
  deviceName,
  deviceType,
  healthy,
  createdAt,
  deleteDevice,
}) => {
  const [show, setShow] = useState(false);
  return (
    <tr
      key={deviceId}
      className="text-center"
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <OverlayTrigger
        key={deviceId}
        placement="top"
        overlay={<Tooltip id={`tooltip-${deviceId}`}>{deviceId}</Tooltip>}
      >
        <td>
          {`${deviceId.substring(0, 3)}...${deviceId.substring(
            deviceId.length - 3,
            deviceId.length
          )}`}
        </td>
      </OverlayTrigger>
      <td>{deviceName}</td>
      <td>{deviceType}</td>
      <td>{healthy === true ? "YES" : "NO"}</td>
      <td>
        <div
          className="flex"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Col md={1} />
          {new Date(createdAt).toDateString()}
          {
            <Button
              className="btn-close"
              onClick={() => deleteDevice(deviceId)}
              variant="outline-danger"
              style={{ visibility: show ? "visible" : "hidden" }}
            />
          }
        </div>
      </td>
    </tr>
  );
};

export default Device;
