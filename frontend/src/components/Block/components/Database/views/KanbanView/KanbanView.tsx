import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  //   DragMoveEvent,
  DragOverEvent,
  DragEndEvent,
  //   DragCancelEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Container from "./Container";
import Item from "./Item";
import { DataType } from "../../BaseDatabase";
import { v4 as uuidv4 } from "uuid";

interface IPropsKanbanView {
  items: DataType[];
}

const KanbanView: React.FC<IPropsKanbanView> = ({ items }) => {
  //   const [containers, setContainers] = useState<
  //     {
  //       id: string;
  //       title: string;
  //       items: string[];
  //     }[]
  //   >([
  //     { id: "1", title: "", items: ["1", "2", "3"] },
  //     { id: "2", title: "", items: ["4", "5", "6"] },
  //     { id: "3", title: "", items: ["7", "8", "9"] },
  //   ]);
  const [containers, setContainers] = useState<
    {
      id: string;
      title: string;
      items: DataType[];
    }[]
  >([
    { id: uuidv4(), title: "", items: items },
    { id: uuidv4(), title: "", items: [] },
  ]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainerById = (
    id: UniqueIdentifier,
    containers: {
      id: string;
      title: string;
      items: DataType[];
    }[]
  ) => {
    // Find a container with the given id
    return containers.find((container) => container.id === id);
  };

  const findContainerByItemId = (
    id: UniqueIdentifier,
    containers: {
      id: string;
      title: string;
      items: DataType[];
    }[]
  ) => {
    // Find a container that contains an item with the given id
    return containers.find((container) => {
      for (let i = 0; i < container.items.length; i++) {
        if (container.items[i].key === id) {
          return true;
        }
      }
      return false;
    });
  };

  const getItemById = (id: UniqueIdentifier) => {
    for (let i = 0; i < containers.length; i++) {
      for (let j = 0; j < containers[i].items.length; j++) {
        if (containers[i].items[j].key === id) {
          return containers[i].items[j];
        }
      }
    }
  };

  const findContainer = (id: UniqueIdentifier) => {
    // Find a container either by id or by containing an item with the given id
    let container = findContainerById(id, containers);
    if (!container) {
      container = findContainerByItemId(id, containers);
    }
    return container;
  };

  const findIndexById = (items: DataType[], id: UniqueIdentifier) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].key === id) {
        return i;
      }
    }
    return -1; // Return -1 if the item is not found
  };

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  //   const onDragMove = (event: DragMoveEvent) => {
  //     return;
  //   };

  // Handle drag over
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || !active) {
      return;
    }

    const draggingRect = active.rect.current;
    const id = active.id;
    const overId = over?.id;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setContainers((prev) => {
      const activeItems = activeContainer.items;
      const overItems = overContainer.items;

      // Find the indexes for the items
      const activeIndex = findIndexById(activeItems, id);
      const overIndex = findIndexById(overItems, overId);

      let newIndex: number;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect.translated!.top > over.rect.top + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      let newContainers = containers;

      return newContainers.map((container) => {
        if (container.id === activeContainer.id) {
          return {
            ...container,
            items: container.items.filter((item) => item.key !== active.id),
          };
        } else if (container.id === overContainer.id) {
          return {
            ...container,
            items: [
              ...container.items.slice(0, newIndex),
              activeContainer.items[activeIndex],
              ...container.items.slice(newIndex, overContainer.items.length),
            ],
          };
        }
        return container;
      });
    });
  };

  //   const onDragCancel = (event: DragCancelEvent) => {
  //     console.log(
  //       `Dragging was cancelled. Draggable item ${event.active.id} was dropped.`
  //     );
  //   };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !active) {
      return;
    }

    const id = active.id;
    const overId = over.id;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = findIndexById(activeContainer.items, id);
    const overIndex = findIndexById(overContainer.items, overId);

    if (activeIndex !== overIndex) {
      let newContainers = containers;

      newContainers = newContainers.map((container) => {
        if (container.id === overContainer.id) {
          return {
            ...container,
            items: arrayMove(container.items, activeIndex, overIndex),
          };
        }
        return container;
      });
      setContainers(newContainers);
    }

    setActiveId(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {containers.map((container) => (
          <Container
            key={container.id}
            id={container.id}
            items={container.items}
          />
        ))}

        <DragOverlay>
          {activeId ? <Item item={getItemById(activeId)!} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default KanbanView;
