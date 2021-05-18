import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Container, Form, Button, Col } from "react-bootstrap";
import { AppContext } from "../../context/ContextProvider";
import { apiClient } from "../../services/axios";
import Field from "./Field";

const Signup = () => {
  const history = useHistory();
  const [validated, setValidated] = useState(false)
  const { success, error } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

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
    e.preventDefault()
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
    setValidated(true)
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
        <Card className="p-2 justify-content-center shadow-lg" border="info">
          <h2>Sign Up</h2>
          <Form validated={validated} onSubmit={signup}>
            <Field
              state={email}
              badFeedback={true}
              goodFeedback={true}
              controlId={"formBasicEmail"}
              label={"Email Address"}
              onChange={onEmailChange}
              text={"We'll never share your email with anyone else."}
              type={"email"}
              key={"email"}
            />
            <Field
              state={firstName}
              badFeedback={true}
              goodFeedback={true}
              controlId={"formBasicFName"}
              label={"First Name"}
              onChange={onFnameChange}
              type={"string"}
              key={"firstName"}
            />
            <Field
              state={lastName}
              badFeedback={true}
              goodFeedback={true}
              controlId={"formBasicLName"}
              label={"Last Name"}
              onChange={onLnameChange}
              type={"string"}
              key={"lastName"}
            />
            <Field
              state={password}
              badFeedback={true}
              goodFeedback={true}
              controlId={"formBasicPassword"}
              label={"Password"}
              onChange={onPasswordChange}
              text={"Your password must be 8-20 characters long, contain letters and numbers"}
              type={"password"}
              key={"password"}
              formOptions={{ minLength: 8, maxLength: 20 }}
            />

            <Field
              state={confirmPass}
              badFeedback={true}
              goodFeedback={true}
              controlId={"formBasicCPassword"}
              label={"Confirm Password"}
              onChange={onConfPassChange}
              type={"password"}
              key={"confirmPassword"}
              placeholder={"Confirm your password"}
            />

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
