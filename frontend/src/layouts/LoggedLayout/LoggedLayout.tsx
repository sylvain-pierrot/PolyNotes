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
  // Retrieve necessary data from custom hook
  const loader: any = useLoaderData();
  const isAuthenticated = !!loader.user;

  // Retrieve current location and navigation function
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Define function for logging out
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  // Retrieve the Redux dispatch function
  const dispatch = useDispatch();

  // Load the file system when the component mounts
  useEffect(() => {
    const fetchFileSystem = async () => {
      const tree = await getFileSystem();
      dispatch(updateFileSystem({ tree }));
    };
    fetchFileSystem();
  }, [dispatch]);

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
};

export default LoggedLayout;
