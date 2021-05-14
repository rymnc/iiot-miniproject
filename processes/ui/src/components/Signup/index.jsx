import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Container, Form, Button, Col } from "react-bootstrap";
import { AppContext } from "../../context/ContextProvider";
import { apiClient } from "../../services/axios";

const Signup = () => {
  const history = useHistory();
  const { success, error } = useContext(AppContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [confirmPass, setConfirmPass] = useState();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onFnameChange = (e) => {
    setFirstName(e.target.value);
  };

  const onLnameChange = (e) => {
    setLastName(e.target.value);
  };

  const onConfPassChange = (e) => {
    setConfirmPass(e.target.value);
  };

  const signup = async (e) => {
    e.preventDefault();
    if (confirmPass !== password) {
      error("Password is not matching");
      return;
    }
    const payload = {
      firstName,
      lastName,
      password,
      email,
    };

    try {
      await apiClient.post("/users", payload);
      success("Successfully Signed Up!");
      success("Please Login Now");
      history.push("/login");
    } catch (e) {
      error("Something went wrong while signing up");
    }
  };

  const center = {
    textAlign: "-webkit-center",
    margin: "0",
    position: "absolute",
    top: "50%",
    msTransform: "translateY(-50%)",
    transform: "translateY(-50%)",
  };

  return (
    <Container fluid className="align-center" style={center}>
      <Col md="auto" xs={12} lg={4} xl={4} sm={12}>
        <Card className="p-2 justify-content-center" border="info">
          <h2>Sign Up</h2>
          <Form onSubmit={signup}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={onEmailChange}
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicFName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                onChange={onFnameChange}
                type="string"
                placeholder="Enter first name"
              />
            </Form.Group>

            <Form.Group controlId="formBasicLName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                onChange={onLnameChange}
                type="string"
                placeholder="Enter last name"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={onPasswordChange}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group controlId="formBasicCPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                onChange={onConfPassChange}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Group>

            <Button variant="outline-primary" type="submit" className="my-2">
              Sign Up
            </Button>
          </Form>
        </Card>
      </Col>
    </Container>
  );
};

export default Signup;
