import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AppProvider } from "./context/ContextProvider";
import { PrivateRoute } from "./components/ProtectedRoute";
import Profile from "./components/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <NavBar />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <PrivateRoute path="/user" render={() => <Profile />} />
          <PrivateRoute path="/devices" />
          <Route path="/login" render={() => <Login />} />
          <Route path="/signup" render={() => <Signup />} />
        </Switch>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
