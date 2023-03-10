import React, { useState } from "react";
import Layout from "antd/es/layout";
import { Button, Menu, MenuProps } from "antd";
import {
  FolderOutlined,
  ShareAltOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./LayoutSider.css";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("My Workspace", "sub1", <FolderOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Option 7", "7"),
    getItem("Option 8", "8"),
  ]),

  getItem("Shared with Me", "sub2", <ShareAltOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
  ]),
];

const LayoutSider: React.FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {isAuthenticated && (
        <Sider
          width={250}
          style={{ backgroundColor: "#fafafa" }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div style={{ padding: "0.8em", marginTop: "0.8em" }}>
            <Button
              type="primary"
              style={{ width: "100%" }}
              icon={<PlusOutlined />}
            >
              New note
            </Button>
          </div>

          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              borderRight: 0,
              backgroundColor: "#fafafa",
              padding: "0.8em",
            }}
            items={items}
          />
        </Sider>
      )}
    </>
  );
};

export default LayoutSider;
