import "./Page.css";
import React from "react";
import Block from "../Block/Block";
import TextBlock from "../Block/components/TextBlock/TextBlock";
import { useImmer } from "use-immer";

const Page: React.FC = () => {
  const [blocks, setBlocks] = useImmer([
    { id: "1", content: "", type: "p", focus: true },
  ]);

  const handleCreateNewBlock = () => {
    console.log("caca");
  };

  return (
    <div style={{ maxWidth: "100%", minWidth: 0, width: "900px" }}>
      {blocks.map((block) => (
        <h1 key={block.id}></h1>
      ))}
      <Block children={<TextBlock onChange={handleCreateNewBlock} />} />
    </div>
  );
};

export default Page;
