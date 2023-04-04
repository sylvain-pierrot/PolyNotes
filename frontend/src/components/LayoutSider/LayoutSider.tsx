import React, { useEffect, useState } from "react";
import Layout from "antd/es/layout";
import { Button, Divider, Menu } from "antd";
import {
  FolderOutlined,
  PlusOutlined,
  FileOutlined,
  ShareAltOutlined,
  FieldTimeOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./LayoutSider.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { DataNode } from "antd/es/tree";
import { Link } from "react-router-dom";
import { getItem, MenuItem } from "../../utils/utils";

const { Sider } = Layout;

const LayoutSider: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [treeData, setTreeData] = useState<DataNode[] | null>(null);

  // Get the file system from the redux store
  const fileSystem: Node | null = useSelector(
    (state: RootState) => state.fileSystemReducer.fileSystem
  );

  // When the file system is loaded, set the treeData state
  useEffect(() => {
    if (fileSystem) {
      setTreeData(fileSystem);
    }
  }, [fileSystem]);

  // Recursive function to create sub-menu items for the tree data
  const subItems = (childrenNodeRoot: any[]): MenuItem[] => {
    if (!childrenNodeRoot) return [];

    return childrenNodeRoot.map((node) => {
      if (node.children) {
        // If the node has children, create a sub-menu item
        return getItem(
          node.title,
          node.key,
          <FolderOutlined />,
          subItems(node.children)
        );
      } else {
        // If the node has no children, create a link item
        return getItem(
          <Link to={`/page/${node.key}`}>{node.title}</Link>,
          node.key,
          <FileOutlined />,
          undefined
        );
      }
    });
  };

  // Create the top-level menu item for the workspace
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
          items={[
            items(treeData),
            getItem("Shared with Me", "sub2", <ShareAltOutlined />, []),
          ]}
        />
      )}

      <Divider style={{ margin: "12px 0" }} />

      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{
          borderRight: 0,
          backgroundColor: "#fafafa",
          padding: "0.8em",
        }}
        items={[
          getItem("Recent", "sub1", <FieldTimeOutlined />, undefined),
          getItem("Stared", "sub2", <StarOutlined />, undefined),
          getItem("Trash", "sub3", <DeleteOutlined />, undefined),
        ]}
      />
    </Sider>
  );
};

export default LayoutSider;
