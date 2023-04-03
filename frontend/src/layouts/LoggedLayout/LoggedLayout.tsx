import React, { useEffect } from "react";
import { Layout } from "antd";
import "./LoggedLayout.css";
import {
  Navigate,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router";
import LayoutHeader from "../../components/LayoutHeader/LayoutHeader";
import LayoutSider from "../../components/LayoutSider/LayoutSider";
import { logoutUser } from "../../boot/Auth";
import { useDispatch } from "react-redux";
import { getFileSystem } from "../../boot/FileSystem";
import { updateFileSystem } from "../../store/slices/fileSystemSlice";

const { Content } = Layout;

const LoggedLayout: React.FC = () => {
  const loader: any = useLoaderData();
  const isAuthenticated = !!loader.user;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error(error);
      // handle error here
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const tree = await getFileSystem();
      dispatch(updateFileSystem({ tree }));
    })();
  }, []);

  if (
    !isAuthenticated &&
    !(pathname === "/" || pathname === "/login" || pathname === "/signup")
  ) {
    return <Navigate replace to="/" />;
  } else if (
    isAuthenticated &&
    (pathname === "/" || pathname === "/login" || pathname === "/signup")
  ) {
    return <Navigate replace to="/workspace" />;
  } else {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <LayoutHeader user={loader.user} logoutUser={handleLogout} />

        <Layout>
          <LayoutSider />

          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#ffffff",
              position: "relative",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
  }
};

export default LoggedLayout;
