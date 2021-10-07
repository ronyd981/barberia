import React from "react";
import { Route, Redirect } from "react-router-dom";
import decode from "jwt-decode";

const PrivateLogin = ({ component: Component, ...rest }) => {
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
    isAuthenticated() ? <Redirect to="/" /> : <Route {...props} />;

  return <MyRoute {...rest} component={Component} />;
};

export default PrivateLogin;
