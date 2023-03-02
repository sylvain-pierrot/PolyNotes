import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import React from "react";
import "./Droppable.css";

interface IPropsDroppable {
  id: UniqueIdentifier;
  position: "top" | "bottom" | "right" | "left";
  blockId: UniqueIdentifier;
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
    background: isOver ? "#eb2f96" : "transparent",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`droppable-${position}`}
    ></div>
  );
};

export default Droppable
