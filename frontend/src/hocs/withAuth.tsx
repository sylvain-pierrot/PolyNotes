import React from "react";
import { Navigate, useLoaderData, useLocation } from "react-router-dom";

const withAuth =
  <P extends object>(Component: React.ComponentType<P>) =>
  (props: P) => {
    // const isAuth = useOutletContext();
    const { pathname } = useLocation();
    const loader: any = useLoaderData();
    const isAuthenticated = !!loader.user;
    console.log(isAuthenticated);

    if (!false) {
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
