import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AppProvider } from "./context/ContextProvider";
import { PrivateRoute } from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import Devices from "./components/Devices";
import "./components/height.css";

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <NavBar />
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <PrivateRoute path="/user">
            <Profile />
          </PrivateRoute>
          <PrivateRoute path="/devices">
            <Devices />
          </PrivateRoute>
          <Route path="/login" component={() => <Login />} />
          <Route path="/signup" component={() => <Signup />} />
        </Switch>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
