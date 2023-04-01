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
  margin: 10,
  flex: 1,
};

interface IPropsContainer {
  id: string;
  title: string;
  items: DataType[];
}

const Container: React.FC<IPropsContainer> = ({ id, title, items }) => {
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
        <h1 className="container-title">{title}</h1>

        {items.map((item) => (
          <SortableItem key={item.key} item={item} />
        ))}
      </div>
    </SortableContext>
  );
};

export default Container;
