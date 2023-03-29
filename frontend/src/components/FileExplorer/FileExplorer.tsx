import { Avatar, Breadcrumb, Button, List, Row } from "antd";
import { FolderFilled, FileOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./FileExplorer.css";
import { Node } from "../../boot/FileSystem";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { createNode } from "../../store/slices/fileSystemSlice";
import { createPage } from "../../boot/Pages";

interface IPropsFileExplorer {
  treeData: Node;
}

const FileExplorer: React.FC<IPropsFileExplorer> = ({ treeData }) => {
  // Store
  const dispatch = useDispatch();

  // Hooks
  const [currentNode, setCurrentNode] = useState<Node>(treeData);

  useEffect(() => {
    const refreshNode = getNode(treeData, currentNode.key);
    if (refreshNode) {
      setCurrentNode(refreshNode);
    }
  }, [treeData]);

  // Functions
  const getNode = (rootNode: Node, key: string): Node | undefined => {
    // If the node's key matches the search key, return the node
    if (rootNode.key === key) {
      return rootNode;
    }

    // If the node has children, recursively search them for the key
    if (rootNode.children) {
      for (let child of rootNode.children) {
        const childNode = getNode(child, key);
        if (childNode) {
          return childNode;
        }
      }
    }

    // If the node has no children and its key does not match the search key, return undefined
    return undefined;
  };

  const getNodesPath = (
    rootNode: Node,
    key: string
  ): { key: string; title: string }[] => {
    // If the node's key matches the search key, return an object with its key and title properties in a new array
    if (rootNode.key === key) {
      return [{ key: rootNode.key, title: rootNode.title }];
    }

    // If the node has children, recursively search them for the key
    if (rootNode.children) {
      for (let child of rootNode.children) {
        const childTitles = getNodesPath(child, key);
        if (childTitles.length > 0) {
          // If the child has the matching key, add its object to the list and return it
          return [{ key: rootNode.key, title: rootNode.title }, ...childTitles];
        }
      }
    }

    // If the node has no children and its key does not match the search key, return an empty array
    return [];
  };

  const addPage = async () => {
    const name = window.prompt("Name");

    if (name) {
      const objectId = await createPage(name);

      const newPage: Node = {
        title: name,
        key: objectId,
      };

      dispatch(createNode({ newNode: newPage, key: currentNode.key }));
    }
  };

  const addFolder = () => {
    const name = window.prompt("Name");

    if (name) {
      const folder: Node = {
        title: name,
        key: uuid(),
        children: [],
      };
      dispatch(createNode({ newNode: folder, key: currentNode.key }));
    }
  };

  return (
    <List
      className="file-explorer"
      header={
        <Row justify={"space-between"} align={"middle"}>
          <Breadcrumb
            style={{
              marginLeft: 24,
            }}
          >
            {getNodesPath(treeData, currentNode.key).map((node) => (
              <Breadcrumb.Item key={node.title}>
                <div
                  className={
                    currentNode.key === node.key ? "" : "breadcrumb-item"
                  }
                  onClick={() => {
                    const newNode = getNode(treeData, node.key);
                    if (newNode) {
                      setCurrentNode(newNode);
                    }
                  }}
                >
                  {node.title}
                </div>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div>
            <Button
              type="text"
              icon={<FolderFilled style={{ color: "#54aeff" }} />}
              onClick={addFolder}
            />
            <Button type="text" icon={<FileOutlined />} onClick={addPage} />
          </div>
        </Row>
      }
      bordered
      dataSource={currentNode.children}
      renderItem={(item) => (
        <List.Item onClick={() => setCurrentNode(item)}>
          <List.Item.Meta
            avatar={
              <Avatar
                icon={
                  item.children ? (
                    <FolderFilled style={{ color: "#54aeff" }} />
                  ) : (
                    <FileOutlined style={{ color: "#656d65" }} />
                  )
                }
                style={{ backgroundColor: "transparent" }}
                size={"large"}
              />
            }
            title={item.title}
            style={{ alignItems: "center" }}
          />
          <List.Item.Meta title={item.children?.length.toString()} />
          <List.Item.Meta title={item.title} />
        </List.Item>
      )}
    />
  );
};

export default FileExplorer;
