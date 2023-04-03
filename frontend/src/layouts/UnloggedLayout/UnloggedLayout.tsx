import React from "react";
import { Button, Layout, Row } from "antd";
import "./UnloggedLayout.css";
import {
  Navigate,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router";
import Logo from "../../assets/images/PolyBunny.png";
import { Header } from "antd/es/layout/layout";

const { Content } = Layout;

const UnloggedLayout: React.FC = () => {
  // Get necessary data from hooks
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const loader: any = useLoaderData(); // It's unclear where `useLoaderData()` comes from, so using `any` for now
  const isAuthenticated = !!loader.user;

  // Determine if the user is authenticated and redirect accordingly
  const shouldRedirectToWorkspace =
    isAuthenticated && ["/", "/login", "/signup"].includes(pathname);
  const shouldRedirectToHomepage =
    !isAuthenticated && !["/", "/login", "/signup"].includes(pathname);

  if (shouldRedirectToWorkspace) {
    return <Navigate replace to="/workspace" />;
  }

  if (shouldRedirectToHomepage) {
    return <Navigate replace to="/" />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="flex-between border-bottom">
        <img
          src={Logo}
          alt="PolyBunny"
          className="logo"
          onClick={() => navigate("/")}
        />

        <Row align={"middle"}>
          {pathname === "/signup" && (
            <>
              <p>You already have an account?</p>
              <Button
                type={"primary"}
                style={{ marginLeft: 8 }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </>
          )}
          {pathname === "/login" && (
            <>
              <p>You don't have an account?</p>
              <Button
                type={"primary"}
                onClick={() => navigate("/signup")}
                style={{ marginLeft: 8 }}
              >
                START
              </Button>
            </>
          )}
        </Row>
      </Header>

      <Layout>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: "#ffffff",
            position: "relative",
          }}
        >
          <Outlet context={isAuthenticated} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UnloggedLayout;
