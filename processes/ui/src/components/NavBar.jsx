import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom'
import { AppContext } from "../context/ContextProvider";

const NavBar = () => {
  const { toggleLogin, loggedIn } = useContext(AppContext)
  const history = useHistory()

  const logout = (e) => {
    localStorage.clear()
    toggleLogin(false)
    history.push('/')
  }

  return (
    <Navbar
      collapseOnSelect
      sticky="top"
      expand="lg"
      bg="dark"
      variant="dark"
      className="p-3 justify-content-between"
    >
      <Navbar.Brand href="/">IIoT Miniproject</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav activeKey={window.location.pathname} className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/devices">Devices</Nav.Link>
          <Nav.Link href="/user">User</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="mr-auto">
            {
              loggedIn === true ?
                <Button variant="outline-danger" onClick={logout}>Logout</Button>
                :
                <Button variant="outline-info" href="/login">Login / Sign Up</Button>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
