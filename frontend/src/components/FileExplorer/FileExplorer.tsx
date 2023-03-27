import { Avatar, Breadcrumb, List } from "antd";
import { FolderOutlined, FileTextOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./FileExplorer.css";
import { Node } from "../../boot/FileSystem";

interface IPropsFileExplorer {
  treeData: Node;
}

const FileExplorer: React.FC<IPropsFileExplorer> = ({ treeData }) => {
  const [currentNode, setCurrentNode] = useState<Node>(treeData);

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

  //   const getParentNode = (rootNode: Node, key: string): Node | null => {
  //     // If the root node matches the key, there is no parent
  //     if (rootNode.key === key) {
  //       return null;
  //     }

  //     // If the root node has children, search them for the key
  //     if (rootNode.children) {
  //       for (let child of rootNode.children) {
  //         // If the child node matches the key, return the root node
  //         if (child.key === key) {
  //           return rootNode;
  //         }

  //         // Otherwise, recursively search the child node's descendants for the key
  //         const parentNode = getParentNode(child, key);
  //         if (parentNode) {
  //           return parentNode;
  //         }
  //       }
  //     }

  //     // If the key is not found, return null
  //     return null;
  //   };

  return (
    <List
      className="file-explorer"
      header={
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
      }
      bordered
      dataSource={currentNode.children}
      renderItem={(item) => (
        <List.Item onClick={() => setCurrentNode(item)}>
          <List.Item.Meta
            avatar={
              <Avatar
                icon={item.children ? <FolderOutlined /> : <FileTextOutlined />}
                style={{ backgroundColor: "#eb2f96", color: "#fff" }}
              />
            }
            title={item.title}
          />
          <List.Item.Meta title={item.title} />
          <List.Item.Meta title={item.title} />
        </List.Item>
      )}
    />
  );
};

export default FileExplorer;
