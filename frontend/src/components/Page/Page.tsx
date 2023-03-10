import "./Page.css";
import React from "react";
import BaseBlock from "../Block/Block";
import TextBlock from "../Block/components/TextBlock/TextBlock";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Block } from "../../store/slices/blocksSlice";

const Page: React.FC = () => {
  // Store
  const blocks: Block[] = useSelector(
    (state: RootState) => state.blocksReducer.blocks
  );

  // Handles
  const handleCreateNewBlock = () => {
    console.log("Hello");
  };

  return (
    <div style={{ maxWidth: "100%", minWidth: 0, width: "900px" }}>
      {blocks.map((block) => (
        <BaseBlock
          key={block.id}
          children={
            <TextBlock
              id={block.id}
              content={block.content}
              type={block.type}
              onChange={handleCreateNewBlock}
            />
          }
        />
      ))}
    </div>
  );
};

export default Page;
