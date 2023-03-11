import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import "./BaseBlock.css";
import { Block, BlockType } from "../../store/slices/blocksSlice";
import TextBlock from "./components/TextBlock/TextBlock";
import { Editor } from "@tiptap/react";

interface IPropsBlock {
  block: Block;
  goRef: (ref: Editor | null) => void;
  handleFocus: (shift: number) => void;
}

const BaseBlock: React.FC<IPropsBlock> = ({ block, goRef, handleFocus }) => {
  return (
    <div className="Block">
      <Button
        className="add-block"
        type="text"
        icon={<PlusOutlined />}
        size="small"
        style={{ color: "#adb5bd" }}
      />
      {block.type === "text" && (
        <TextBlock
          id={block.id}
          content={block.content}
          type={block.type}
          ref={(ref) => {
            goRef(ref);
          }}
          onArrowPressed={(event) => {
            const direction: Record<string, number> = {
              ArrowUp: -1,
              ArrowDown: 1,
            };
            handleFocus(direction[event.key]);
          }}
          onDestroy={() => handleFocus(-1)}
        />
      )}
    </div>
  );
};

export default BaseBlock;
