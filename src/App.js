import React from "react";
import "./App.css";
import Contacts from "./components/Contacts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <Switch>
            <Route exact path="/HomePage">
              <HomePage />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/Contacts">
              <Contacts />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
