import React from "react";
import { Navigate, useLocation, useOutletContext } from "react-router-dom";

const withAuth =
  <P extends object>(Component: React.ComponentType<P>) =>
  (props: P) => {
    const isAuth = useOutletContext();
    const { pathname } = useLocation();
    console.log("isAuth:", isAuth);

    if (!isAuth) {
      if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
        return <Component {...props} />;
      } else {
        return <Navigate replace to="/" />;
      }
    } else if (
      pathname === "/" ||
      pathname === "/login" ||
      pathname === "/signup"
    ) {
      return <Navigate replace to="/workspace" />;
    } else {
      return <Component {...props} />;
    }
  };

export default withAuth;
