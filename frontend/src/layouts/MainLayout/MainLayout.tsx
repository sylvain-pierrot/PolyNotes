import React, { useEffect } from "react";
import { Button, Layout, Row } from "antd";
import "./MainLayout.css";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import Logo from "../../assets/images/PolyBunny.png";
import { Header } from "antd/es/layout/layout";
import { logoutUser } from "../../boot/Auth";
import { useDispatch } from "react-redux";
import { getFileSystem } from "../../boot/FileSystem";
import { updateFileSystem } from "../../store/slices/fileSystemSlice";
import LayoutHeader from "../../components/LayoutHeader/LayoutHeader";
import LayoutSider from "../../components/LayoutSider/LayoutSider";
import { isLoggedIn } from "../../utils/utils";

const { Content } = Layout;

const MainLayout: React.FC = () => {
  // Retrieve current location and navigation function
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Define function for logging out
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      throw new Error("Failed to logout");
    } finally {
      localStorage.clear();
      navigate("/");
    }
  };

  // Retrieve the Redux dispatch function
  const dispatch = useDispatch();

  // Load the file system when the component mounts, but only if the user is authenticated
  useEffect(() => {
    if (isLoggedIn()) {
      const fetchFileSystem = async () => {
        const tree = await getFileSystem();
        dispatch(updateFileSystem({ tree }));
      };
      fetchFileSystem();
    }
  }, [dispatch, pathname]);

  // Determine if the user is authenticated and redirect accordingly
  const shouldRedirectToWorkspace =
    isLoggedIn() &&
    (["/", "/login", "/signup"].includes(pathname) ||
      pathname.startsWith("/verifyEmail"));
  const shouldRedirectToHomepage =
    !isLoggedIn() && ["/workspace"].includes(pathname);

  if (shouldRedirectToWorkspace) {
    return <Navigate replace to="/workspace" />;
  }
  if (shouldRedirectToHomepage) {
    return <Navigate replace to="/" />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isLoggedIn() && <LayoutHeader logoutUser={handleLogout} />}
      {!isLoggedIn() && (
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
      )}

      <Layout>
        {isLoggedIn() && <LayoutSider />}

        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: "#ffffff",
            position: "relative",
            display: !isLoggedIn() ? "flex" : "initial",
            justifyContent: !isLoggedIn() ? "center" : "initial",
            alignItems: !isLoggedIn() ? "center" : "initial",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
