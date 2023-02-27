import React from "react";
import { Layout } from "antd";
import "./MainLayout.css";
import { Outlet } from "react-router";
import LayoutHeader from "../../components/LayoutHeader/LayoutHeader";
import LayoutSider from "../../components/LayoutSider/LayoutSider";

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout>
      <LayoutHeader />

      <Layout>
        <LayoutSider />

        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: "#ffffff",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
