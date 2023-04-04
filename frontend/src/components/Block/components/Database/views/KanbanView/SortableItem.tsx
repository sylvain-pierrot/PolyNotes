import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Item from "./Item";
import { DataType } from "../../../../../../utils/utils";

interface IPropsSortableItem {
  item: DataType;
}

const SortableItem: React.FC<IPropsSortableItem> = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item item={item} />
    </div>
  );
};

export default SortableItem;
