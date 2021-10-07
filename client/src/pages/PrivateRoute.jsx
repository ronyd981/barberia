import React from "react";
import { Route, Redirect } from "react-router-dom";
import decode from "jwt-decode";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = localStorage.getItem("token");

  const isAuthenticated = () => {
    let isValid = true;
    try {
      isValid = decode(auth);
    } catch (error) {
      return false;
    }
    return isValid;
  };

  const MyRoute = (props) =>
    isAuthenticated() ? <Route {...props} /> : <Redirect to="/login" />;

  return <MyRoute {...rest} component={Component} />;
};

export default PrivateRoute;
