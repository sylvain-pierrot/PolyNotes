import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { DataType } from "../../BaseDatabase";

const containerStyle = {
  background: "#dadada",
  padding: 10,
  margin: 10,
  flex: 1,
};

interface IPropsContainer {
  id: string;
  items: DataType[];
}

const Container: React.FC<IPropsContainer> = ({ id, items }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      items={items.map((item) => item.key)}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} style={containerStyle}>
        {items.map((item) => (
          <SortableItem key={item.key} id={item.key} />
        ))}
      </div>
    </SortableContext>
  );
};

export default Container;
