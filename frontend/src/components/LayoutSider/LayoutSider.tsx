import React, { useEffect, useState } from "react";
import Layout from "antd/es/layout";
import { Button, Divider, List, Menu, MenuProps } from "antd";
import {
  FolderOutlined,
  ShareAltOutlined,
  PlusOutlined,
  FileOutlined,
} from "@ant-design/icons";
import "./LayoutSider.css";
import DirectoryTree, { DirectoryTreeProps } from "antd/es/tree/DirectoryTree";
import { updateFileSystem } from "../../store/slices/fileSystemSlice";
import { getFileSystem } from "../../boot/FileSystem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { DataNode } from "antd/es/tree";
import { Link } from "react-router-dom";

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

const LayoutSider: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const data = ["Recent", "Started", "Trash"];
  const [treeData, setTreeData] = useState<DataNode[] | null>(null);
  const fileSystem: Node | null = useSelector(
    (state: RootState) => state.fileSystemReducer.fileSystem
  );

  useEffect(() => {
    if (fileSystem) {
      setTreeData(fileSystem);
    }
  }, [fileSystem]);

  const subItems = (childrenNodeRoot: any[]): MenuItem[] => {
    if (!childrenNodeRoot) return [];
    return childrenNodeRoot.map((node) => {
      if (node.children) {
        return getItem(
          node.title,
          node.key,
          <FolderOutlined />,
          subItems(node.children)
        );
      } else {
        return getItem(
          <Link to={`/page/${node.key}`}>{node.title}</Link>,
          node.key,
          <FileOutlined />,
          undefined
        );
      }
    });
  };

  const items = (treeData: any): MenuItem => {
    const subMenu = subItems(treeData.children);
    return getItem("Workspace", "sub1", <FolderOutlined />, subMenu);
  };

  return (
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

      {treeData && (
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{
            borderRight: 0,
            backgroundColor: "#fafafa",
            padding: "0.8em",
          }}
          items={[items(treeData)]}
        />
      )}

      <Divider style={{ margin: "12px 0" }} />

      <List
        size="small"
        split={false}
        dataSource={data}
        renderItem={(item) => (
          <List.Item style={{ justifyContent: "center" }}>
            <Button type="text">{item}</Button>
          </List.Item>
        )}
      />
    </Sider>
  );
};

export default LayoutSider;
