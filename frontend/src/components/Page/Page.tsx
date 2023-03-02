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
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Block from "../Block/Block";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import RowBlock from "../Block/components/RowBlock/RowBlock";

interface Position {
  x: number;
  y: number;
}

const Page: React.FC = () => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [matrixBlocks, setMatrixBlocks] = useState([
    [<Block id={1} />],
    [<Block id={2} />],
    [<Block id={3} />],
    [<Block id={4} />],
    [<Block id={5} />, <Block id={6} />],
  ]);

  const getPos = (id: UniqueIdentifier) => {
    let pos: Position = { x: 0, y: 0 };
    for (let i in matrixBlocks) {
      for (let j in matrixBlocks[i]) {
        if (matrixBlocks[i][j].props.id === id) {
          pos.x = parseInt(j);
          pos.y = parseInt(i);
        }
      }
    }
    return pos;
  };

  const [active, setActive] = useState<Active | null>(null);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.data.current!.blockId) {
      // Active
      const activeId = active.id;
      const activePos = getPos(activeId);

      // Over
      const overId = over.data.current!.blockId;
      const overPos = getPos(overId);

      // Behaviors
      let newMatrixBlocks = matrixBlocks;
      const block = newMatrixBlocks[activePos.y][activePos.x];

      switch (over.data.current!.position) {
        case "top": {
          if (newMatrixBlocks[activePos.y].length <= 1) {
            if (activePos.y < overPos.y) {
              newMatrixBlocks = arrayMove(
                matrixBlocks,
                activePos.y,
                overPos.y - 1
              );
            } else {
              newMatrixBlocks = arrayMove(matrixBlocks, activePos.y, overPos.y);
            }
          } else {
            newMatrixBlocks[activePos.y].splice(activePos.x, 1);
            newMatrixBlocks.splice(overPos.y, 0, [block]);
          }
          break;
        }
        // case "bottom": {
        //   // newBlocksState = arrayMove(blocks, activeIndex, overIndex);
        //   break;
        // }
        // case "left": {
        //   if (newMatrixBlocks[activePos.y].length <= 1) {
        //     newMatrixBlocks[overPos.y].splice(overPos.x, 0, block);

        //     newMatrixBlocks.splice(activePos.y, 1);
        //   } else {
        //     newMatrixBlocks[overPos.y].splice(overPos.x, 0, block);
        //     newMatrixBlocks[activePos.y].splice(activePos.x, 1);
        //   }
        //   break;
        // }
        case "right": {
          if (newMatrixBlocks[activePos.y].length <= 1) {
            newMatrixBlocks[overPos.y].splice(overPos.x + 1, 0, block);

            newMatrixBlocks.splice(activePos.y, 1);
          } else {
            newMatrixBlocks[overPos.y].splice(overPos.x + 1, 0, block);
            newMatrixBlocks[activePos.y].splice(activePos.x, 1);
          }

          break;
        }
      }

      setMatrixBlocks(newMatrixBlocks!);
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
    <div style={{ maxWidth: "100%", minWidth: 0, width: "900px" }}>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        onDragStart={handleDragStart}
      >
        <div className="page-content">
          {matrixBlocks.map((blocksList, index) => (
            <RowBlock key={index} items={blocksList} />
          ))}
        </div>

        <DragOverlay dropAnimation={null}>
          {active ? <Block id={active.id} dragOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );

  // return <SortableBlocks blocks={blocks} onChange={setBlocks} />;
};

export default Page;
