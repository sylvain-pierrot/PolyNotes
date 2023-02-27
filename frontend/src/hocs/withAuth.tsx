import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated: boolean = true;

const withAuth =
  <P extends object>(Component: React.ComponentType<P>) =>
  (props: P) => {
    if (isAuthenticated) {
      return <Component {...props} />;
    }

    return <Navigate replace to="/" />;
  };

export default withAuth;
