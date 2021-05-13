import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from './components/Login'
import { AppProvider } from './context/ContextProvider'


const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user" />
          <Route path="/devices" />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
