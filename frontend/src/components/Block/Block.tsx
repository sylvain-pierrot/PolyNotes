import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { HolderOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect } from "react";
import "./Block.css";
import Droppable from "./components/Droppable/Droppable";
import TextBlock from "./components/TextBlock/TextBlock";

interface IPropsBlock {
  id: UniqueIdentifier;
  dragOverlay?: boolean;
}

const Block: React.FC<IPropsBlock> = ({ id, dragOverlay }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
  });

  const style = {
    opacity: dragOverlay ? 0.5 : 1,
  };

  return (
    <div className="Block" ref={setNodeRef} {...attributes} style={style}>
      <Button
        className="DragHandle"
        {...listeners}
        type="text"
        icon={<HolderOutlined />}
      />

      <TextBlock id={id} />

      <Droppable id={`${id + "top"}`} position={"top"} blockId={id} />
      {/* <Droppable id={`${id + "bottom"}`} position={"bottom"} blockId={id} /> */}
      <Droppable id={`${id + "right"}`} position={"right"} blockId={id} />
      {/* <Droppable id={`${id + "left"}`} position={"left"} blockId={id} /> */}
    </div>
  );
};

export default Block;
