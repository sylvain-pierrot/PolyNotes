import React, { createContext, useMemo } from "react";
import type { CSSProperties, PropsWithChildren } from "react";
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import "./SortableBlock.css";
import { HolderOutlined } from "@ant-design/icons";
import { Button } from "antd";
import TextBlock from "../TextBlock/TextBlock";

interface Props {
  id: UniqueIdentifier;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableBlockContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

const SortableBlock: React.FC<PropsWithChildren<Props>> = ({ id }) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transition } =
    useSortable({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );
  const style: CSSProperties = {
    // opacity: isDragging ? 0.5 : 1,
    // transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableBlockContext.Provider value={context}>
      <div ref={setNodeRef} style={style} className="SortableBlock">
        <TextBlock />
        <Button
          type="text"
          className="DragHandle"
          {...attributes}
          {...listeners}
          ref={setNodeRef}
          icon={<HolderOutlined />}
          size={"middle"}
        />
      </div>
    </SortableBlockContext.Provider>
  );
};

export { SortableBlock };
