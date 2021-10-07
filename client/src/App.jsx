import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  NotFound,
  Services,
  Users,
  Login,
  Index,
  PrivateRoute,
  PrivateLogin,
  Guest,
} from "./pages/export";

const App = () => {
  return (
    <Router>
      <div className="overflow-hidden">
        <Switch>
          <PrivateLogin exact path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Index} />
          <PrivateRoute exact path="/users" component={Users} />
          <PrivateRoute exact path="/services" component={Services} />
          <Route exact path="/guest" component={Guest} />
          <PrivateRoute exact path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
