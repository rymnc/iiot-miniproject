import React, { useContext, useState } from "react";
import { Card, Container, Form, Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/ContextProvider";
import { apiClient } from "../../services/axios";

const Profile = () => {
  const { userData, updateUserData, success, error } = useContext(AppContext);
  const history = useHistory();
  const [localUser, setLocalUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const center = {
    textAlign: "-webkit-center",
    margin: "0",
    position: "absolute",
    top: "50%",
    msTransform: "translateY(-50%)",
    transform: "translateY(-50%)",
  };

  const removeNull = (data) => {
    const returnObj = {};
    Object.keys(data).forEach((key) => {
      if (data[key] !== "") returnObj[key] = data[key];
    });
    return returnObj;
  };

  const update = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiClient.post(
        "/users/update",
        removeNull(localUser)
      );
      success("Successfully updated user details!");
      updateUserData(data);
      setLocalUser(data);
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
    } catch (e) {
      if (e?.response?.status === 401) {
        history.push("/login");
        error("Session Expired. Please Re-Login");
      }
      error(e.message);
    }
  };

  const onChange = (e, name) => {
    setLocalUser({ ...localUser, [name]: e.target.value });
  };

  return (
    <Container fluid className="align-center" style={center}>
      <Col md="auto" xs={12} lg={4} xl={4} sm={12}>
        <Card className="p-2 justify-content-center shadow-lg" border="info">
          <h2>User Profile</h2>
          <Form onSubmit={update}>
            <Form.Group
              as={Row}
              controlId="formBasicEmail"
              className="my-2 mx-auto"
            >
              <Form.Label column="sm-2">Email address</Form.Label>

              <Col sm="6">
                <Form.Control
                  onChange={(e) => onChange(e, "firstName")}
                  type="string"
                  placeholder={userData?.email}
                  className="text-center"
                  disabled={true}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              controlId="formBasicFName"
              className="my-2 mx-auto"
            >
              <Form.Label column="sm-2">First Name</Form.Label>
              <Col sm="6">
                <Form.Control
                  onChange={(e) => onChange(e, "firstName")}
                  type="string"
                  placeholder={userData?.firstName}
                  className="text-center"
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              controlId="formBasicLName"
              className="my-2 mx-auto"
            >
              <Form.Label column="sm-2">Last Name</Form.Label>
              <Col sm="6">
                <Form.Control
                  onChange={(e) => onChange(e, "lastName")}
                  type="string"
                  placeholder={userData?.lastName}
                  className="text-center"
                />
              </Col>
            </Form.Group>

            <Button variant="outline-info" type="submit" className="my-2">
              Update Details
            </Button>
          </Form>
        </Card>
      </Col>
    </Container>
  );
};

export default Profile;
