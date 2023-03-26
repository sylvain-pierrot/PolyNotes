import React from "react";
import { Layout } from "antd";
import "./MainLayout.css";
import { Outlet, useLoaderData } from "react-router";
import LayoutHeader from "../../components/LayoutHeader/LayoutHeader";
import LayoutSider from "../../components/LayoutSider/LayoutSider";

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const loader: any = useLoaderData();

  const isAuthenticated = !!loader.user;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <LayoutHeader isAuthenticated={isAuthenticated} user={loader.user} />

      <Layout>
        <LayoutSider isAuthenticated={isAuthenticated} />

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

export default MainLayout;
