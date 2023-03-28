import { Avatar, Breadcrumb, Button, List, Row } from "antd";
import { FolderOutlined, FileOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./FileExplorer.css";
import { Node } from "../../boot/FileSystem";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
// import { updateFileSystem } from "../../store/slices/fileSystemSlice";

interface IPropsFileExplorer {
  treeData: Node;
}

const FileExplorer: React.FC<IPropsFileExplorer> = ({ treeData }) => {
  // Store
  const dispatch = useDispatch();

  // State
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

  function addFileToTree(tree: Node, key: string, newNode: Node) {
    if (tree.key === key) {
      tree.children!.push(newNode);
    } else if (tree.children) {
      for (let i = 0; i < tree.children.length; i++) {
        addFileToTree(tree.children[i], key, newNode);
      }
    }
    return tree;
  }

  const addFile = () => {
    const name = window.prompt("Name");

    if (name) {
      console.log(name);

      // const file: Node = {
      //   title: name,
      //   key: uuid(),
      // };
      // const newTree = addFileToTree(treeData, currentNode.key, file);
      // console.log(newTree);
      console.log(treeData);

      // dispatch(updateFileSystem({ tree: newTree }));
    }
  };

  const addFolder = () => {
    const name = window.prompt("Name");

    if (name) {
      console.log(name);
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
            <Button type="text" icon={<FolderOutlined />} onClick={addFolder} />
            <Button type="text" icon={<FileOutlined />} onClick={addFile} />
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
                icon={item.children ? <FolderOutlined /> : <FileOutlined />}
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
