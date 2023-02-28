import React from "react";
import { Navigate, useOutletContext } from "react-router-dom";

const withAuth =
  <P extends object>(Component: React.ComponentType<P>) =>
  (props: P) => {
    const isAuth = useOutletContext();

    if (isAuth) {
      return <Component {...props} />;
    }

    return <Navigate replace to="/" />;
  };

export default withAuth;
