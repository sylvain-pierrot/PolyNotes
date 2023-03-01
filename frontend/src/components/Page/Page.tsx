import "./Page.css";
import React, { useState } from "react";
import {
  Active,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Block from "../Block/Block";
import ColumnListBlock from "../Block/components/ColumnListBlock/ColumnListBlock";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

const Page: React.FC = () => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [blocks, setBlocks] = useState<Array<any>>([
    <Block id={1} />,
    <Block id={2} />,
    <Block id={3} />,
    <Block id={4} />,
    <Block id={5} />,
  ]);

  const [active, setActive] = useState<Active | null>(null);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.data.current!.blockId) {
      // Active
      const activeId = active.id;
      const activeIndex = blocks.findIndex(
        ({ props }) => props.id === activeId
      );

      // Over
      const overId = over.data.current!.blockId;
      const overIndex = blocks.findIndex(({ props }) => props.id === overId);

      // Behaviors
      let newBlocksState: Array<any>;
      switch (over.data.current!.position) {
        // case "top": {
        //   newBlocksState = arrayMove(blocks, activeIndex, overIndex);
        //   break;
        // }
        case "bottom": {
          newBlocksState = arrayMove(blocks, activeIndex, overIndex + 1);
          break;
        }
        case "left": {
          const list = [blocks[overIndex], blocks[activeIndex]];
          newBlocksState = blocks;
          newBlocksState[overIndex] = <ColumnListBlock items={list} />;
          newBlocksState.splice(activeIndex, 1);
          break;
        }
        case "right": {
          const list = [blocks[overIndex], blocks[activeIndex]];
          newBlocksState = blocks;
          newBlocksState[overIndex] = <ColumnListBlock items={list} />;
          newBlocksState.splice(activeIndex, 1);
          break;
        }
        default: {
          newBlocksState = arrayMove(blocks, activeIndex, overIndex);

          break;
        }
      }

      setBlocks(newBlocksState!);
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
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      onDragStart={handleDragStart}
    >
      <div>
        {blocks.map((block) => (
          <React.Fragment key={block.props.id}>{block}</React.Fragment>
        ))}
      </div>

      <DragOverlay dropAnimation={null}>
        {active ? <Block id={active.id} dragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );

  // return <SortableBlocks blocks={blocks} onChange={setBlocks} />;
};

export default Page;
