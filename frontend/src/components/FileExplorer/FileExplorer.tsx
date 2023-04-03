import { Avatar, Breadcrumb, Button, List, Row } from "antd";
import { FolderFilled, FileOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import "./FileExplorer.css";
import { Node } from "../../boot/FileSystem";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { createNode } from "../../store/slices/fileSystemSlice";
import { createPage } from "../../boot/Pages";
import { useNavigate } from "react-router";

interface IPropsFileExplorer {
  treeData: Node;
}

const FileExplorer: React.FC<IPropsFileExplorer> = ({ treeData }) => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentNode, setCurrentNode] = useState<Node>(treeData);
  const getNode = useCallback(
    (rootNode: Node, key: string): Node | undefined => {
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
    },
    []
  );

  // Refresh the current node when the treeData changes
  useEffect(() => {
    const refreshNode = getNode(treeData, currentNode.key);
    if (refreshNode) {
      setCurrentNode(refreshNode);
    }
  }, [treeData, currentNode.key, getNode]);

  // recursively searches for a node's path and returns an array of objects with their key and title properties
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

  // prompts the user for a name, creates a new page with the name, and dispatches an action to add the new page as a child of the current node
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

  // prompts the user for a name, creates a new folder with the name and an empty children array, and dispatches an action to add the new folder as a child of the current node
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

  const handleClickOnItem = (item: Node) => {
    if (item.children) {
      setCurrentNode(item);
    } else {
      navigate(`/page/${item.key}`);
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
        <List.Item onClick={() => handleClickOnItem(item)}>
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
        </List.Item>
      )}
    />
  );
};

export default FileExplorer;
