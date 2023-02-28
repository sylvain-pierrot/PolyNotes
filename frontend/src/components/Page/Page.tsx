import React, { useState } from "react";
import TextBlock from "../TextBlock/TextBlock";
import "./Page.css";
import { Tree } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";

const defaultData: DataNode[] = [
  {
    title: (
      <TextBlock
        placeholder={"Untitiled"}
        content={""}
        className={"block page-block"}
      />
    ),
    key: "0",
  },
  {
    title: (
      <TextBlock
        placeholder={"Untitiled"}
        content={""}
        className={"block page-block"}
      />
    ),
    key: "1",
  },
  {
    title: (
      <TextBlock
        placeholder={"Untitiled"}
        content={""}
        className={"block page-block"}
      />
    ),
    key: "2",
  },
];

const Page: React.FC = () => {
  // const [title, setTtitle] = useState("");

  // const handleChange = (event: any) => {
  //   setTtitle(event.target.value);
  // };

  const [gData, setGData] = useState(defaultData);

  const onDragEnter: TreeProps["onDragEnter"] = (info) => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // setExpandedKeys(info.expandedKeys)
  };

  const onDrop: TreeProps["onDrop"] = (info) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj: DataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    let ar: DataNode[] = [];
    let i: number;
    loop(data, dropKey, (_item, index, arr) => {
      ar = arr;
      i = index;
    });
    if (dropPosition === -1) {
      ar.splice(i!, 0, dragObj!);
    } else {
      ar.splice(i! + 1, 0, dragObj!);
    }

    setGData(data);
  };

  return (
    <>
      {/* <TextBlock
        placeholder={"Untitiled"}
        content={title}
        className={"block page-block"}
      />
      <div className="page-core">
        <TextBlock
          placeholder={"Press 'space' for AI, '/' for commands..."}
          content={""}
          className={"block text-block"}
        />
        <TextBlock
          placeholder={"Heading 1"}
          content={""}
          className={"block header-block"}
        />
      </div> */}
      <Tree
        className="draggable-tree"
        draggable
        blockNode={true}
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        treeData={gData}
        checkStrictly={true}
      />
    </>
  );
};

export default Page;
