import React from "react";
import { FolderOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, MenuProps, Avatar, Button } from "antd";
import { Input } from "antd";
import Logo from "../../assets/images/PolyBunny.png";
import Logo2 from "../../assets/images/polynotes-logo.svg";
import "./MainLayout.css";
import { Outlet } from "react-router";

const { Header, Content, Sider } = Layout;
const { Search } = Input;

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

const onSearch = (value: string) => console.log(value);

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const isAuthenticated = false;

  return (
    <Layout>
      <Header
        className={
          isAuthenticated ? "flex-between border-bottom" : "flex-center"
        }
      >
        {isAuthenticated ? (
          <>
            <img src={Logo} alt="PolyBunny" className="logo" />

            <Search
              placeholder="Search"
              onSearch={onSearch}
              className="search"
            />

            <Avatar
              style={{ backgroundColor: "#eb2f96", verticalAlign: "middle" }}
              size="large"
              alt={"User"}
            >
              AC
            </Avatar>
          </>
        ) : (
          <img
            src={Logo2}
            alt="polynotes-logo"
            style={{ width: "55%", maxWidth: "300px", margin: "2em 0" }}
          />
        )}
      </Header>

      <Layout>
        {isAuthenticated && (
          <Sider
            width={210}
            style={{ background: colorBgContainer, padding: "0.8em" }}
          >
            <Button type="primary" style={{ width: "100%", margin: "0.6em 0" }}>
              + create
            </Button>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              items={items}
            />
          </Sider>
        )}

        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
