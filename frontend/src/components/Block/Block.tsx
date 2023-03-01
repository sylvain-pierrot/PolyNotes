import { UniqueIdentifier, useDraggable, useDroppable } from "@dnd-kit/core";
import React from "react";
import "./Block.css";

interface IPropsDroppable {
  id: UniqueIdentifier;
  position: "top" | "bottom" | "right" | "left";
  blockId: UniqueIdentifier;
}

interface IPropsBlock {
  id: UniqueIdentifier;
  dragOverlay?: boolean;
}

const Droppable: React.FC<IPropsDroppable> = ({ id, position, blockId }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: {
      position: position,
      blockId: blockId,
    },
  });

  const style: React.CSSProperties = {
    background: isOver ? "green" : "transparent",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`droppable-${position}`}
    ></div>
  );
};

const Block: React.FC<IPropsBlock> = ({ id, dragOverlay }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
  });

  const style = {
    opacity: dragOverlay ? 0.15 : 1,
  };

  return (
    <div
      className="Block"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <span>{id}</span>

      {/* <Droppable id={`${id + "top"}`} position={"top"} blockId={id} /> */}
      <Droppable id={`${id + "bottom"}`} position={"bottom"} blockId={id} />
      <Droppable id={`${id + "right"}`} position={"right"} blockId={id} />
      <Droppable id={`${id + "left"}`} position={"left"} blockId={id} />
    </div>
  );
};

export default Block;
