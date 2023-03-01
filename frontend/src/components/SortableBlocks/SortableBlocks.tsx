import React, { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import type { Active, UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { SortableBlock } from "../SortableBlock/SortableBlock";

import "./SortableBlocks.css";
import TextBlock from "../TextBlock/TextBlock";
interface BaseBlock {
  id: UniqueIdentifier;
  type: "text" | "header";
  content: string;
}

interface IPropsSortableBlocks<T extends BaseBlock> {
  blocks: T[];
  onChange(blocks: T[]): void;
}

const SortableBlocks: React.FC<IPropsSortableBlocks<any>> = ({
  blocks,
  onChange,
}) => {
  const [active, setActive] = useState<Active | null>(null);
  const activeBlock = useMemo(
    () => blocks.find((block) => block.id === active?.id),
    [active, blocks]
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over?.id) {
      const activeIndex = blocks.findIndex(({ id }) => id === active.id);
      const overIndex = blocks.findIndex(({ id }) => id === over.id);

      onChange(arrayMove(blocks, activeIndex, overIndex));
    }
    setActive(null);
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActive(active);
  };

  const handleDragCancel = () => {
    setActive(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={blocks}>
        <div className="SortableBlocks" role="application">
          {blocks.map((block) => (
            <div key={block.id} style={{ position: "relative" }}>
              <DropArea />
              <SortableBlock id={block.id} />
            </div>
          ))}
        </div>
      </SortableContext>

      <DragOverlay dropAnimation={null}>
        {activeBlock ? <TextBlock dragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
};

const DropArea: React.FC = () => {
  const { isOver, setNodeRef } = useDroppable({ id: "drop" });

  const style: React.CSSProperties = {
    position: "absolute",
    background: isOver ? "green" : "#ccc",
    top: 0,
    bottom: 0,
    left: "100%",
    width: "4px",
  };

  return <div style={style} ref={setNodeRef} />;
};

export default SortableBlocks;
