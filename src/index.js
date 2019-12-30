import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss";
import "assets/css/demo.css";
import "assets/scss/fitness.scss";

import AdminLayout from "layouts/Admin.jsx";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" render={props => <AdminLayout {...props} />} />
      <Redirect to="/info" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
