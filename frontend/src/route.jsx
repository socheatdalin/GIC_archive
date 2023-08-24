import React from "react";
import App from ".";

import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Login from './auth/login';

export default function Route() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home1" component={App} />
        <Route path="/" component={Login} />
        {/* <Route path="/home1 " /> <App /> */}
      </Switch>
    </BrowserRouter>
  );
}
