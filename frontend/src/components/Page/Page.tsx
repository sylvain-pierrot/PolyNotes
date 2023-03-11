import "./Page.css";
import React, { useRef } from "react";
import BaseBlock from "../Block/Block";
import TextBlock from "../Block/components/TextBlock/TextBlock";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Block } from "../../store/slices/blocksSlice";
import { Editor } from "@tiptap/react";

const Page: React.FC = () => {
  // Refs
  const refs = useRef<(Editor | null)[]>([]);

  // Store
  const blocks: Block[] = useSelector(
    (state: RootState) => state.blocksReducer.blocks
  );

  // Handles
  // const handleCreateNewBlock = () => {
  //   console.log("Hello");
  // };

  const handleFocus = (index: number) => {
    refs.current[index]?.chain().focus().run();
  };

  return (
    <div style={{ maxWidth: "100%", minWidth: 0, width: "900px" }}>
      {blocks.map((block, index) => (
        <BaseBlock
          key={block.id}
          children={
            <TextBlock
              id={block.id}
              content={block.content}
              type={block.type}
              // onChange={handleCreateNewBlock}
              ref={(ref) => {
                refs.current[index] = ref;
              }}
              onArrowPressed={(event) => {
                const direction: Record<string, number> = {
                  ArrowUp: -1,
                  ArrowDown: 1,
                };
                const nextIndex: number = index + direction[event.key];
                handleFocus(nextIndex);
              }}
              onDestroy={() => handleFocus(index - 1)}
            />
          }
        />
      ))}
    </div>
  );
};

export default Page;
