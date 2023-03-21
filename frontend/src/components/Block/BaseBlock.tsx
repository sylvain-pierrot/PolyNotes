import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import "./BaseBlock.css";
import {
  Block,
  BlockType,
  destroyBlock,
  newBlock,
} from "../../store/slices/blocksSlice";
import TextBlock from "./components/TextBlock/TextBlock";
import { Editor } from "@tiptap/react";
import { useDispatch } from "react-redux";
import ImageBlock from "./components/ImageBlock/ImageBlock";
import BaseDatabase from "./components/Database/BaseDatabase";
import BulletListBlock from "./components/BulletListBlock/BulletListBlock";
import OrderedListBlock from "./components/OrderedListBlock/OrderedListBlock";

interface IPropsBlock {
  block: Block;
  goRef: (ref: Editor | null) => void;
  handleFocus: (shift: number) => void;
}

const BaseBlock: React.FC<IPropsBlock> = ({ block, goRef, handleFocus }) => {
  // States
  const [ref, setRef] = useState<Editor | null>(null);

  // Store
  const dispatch = useDispatch();

  // Handles
  const handleDestroyBlock = () => {
    dispatch(destroyBlock({ id: block.id }));
  };
  const handleArrows = (event: any) => {
    const direction: Record<string, number> = {
      ArrowUp: -1,
      ArrowDown: 1,
    };
    handleFocus(direction[event.key]);
  };

  return (
    <div className="Block">
      <div className="actions-block">
        <Button
          type="text"
          icon={<DeleteOutlined />}
          size="small"
          style={{ color: "#adb5bd" }}
          onClick={handleDestroyBlock}
        />
        <Button
          type="text"
          icon={<PlusOutlined />}
          size="small"
          style={{ color: "#adb5bd" }}
          onClick={() => {
            if (ref?.isEmpty && block.type === "text") {
              ref?.chain().focus().setContent("/").run();
            } else {
              dispatch(newBlock({ id: block.id, content: "/" }));
            }
          }}
        />
      </div>

      {block.type === BlockType.BASIC && (
        <TextBlock
          id={block.id}
          content={block.content}
          ref={(ref) => {
            goRef(ref);
            setRef(ref);
          }}
          handleArrows={handleArrows}
          onDestroy={() => handleFocus(-1)}
        />
      )}
      {block.type === BlockType.IMAGE && (
        <ImageBlock
          id={block.id}
          content={block.content}
          ref={(ref) => {
            goRef(ref);
            setRef(ref);
          }}
        />
      )}
      {block.type === BlockType.TABLE && <BaseDatabase />}
      {block.type === BlockType.BULLET_LIST && (
        <BulletListBlock
          id={block.id}
          content={block.content}
          ref={(ref) => {
            goRef(ref);
            setRef(ref);
          }}
          handleArrows={handleArrows}
          onDestroy={() => handleFocus(-1)}
        />
      )}
      {block.type === BlockType.ORDERED_LIST && (
        <OrderedListBlock
          id={block.id}
          content={block.content}
          ref={(ref) => {
            goRef(ref);
            setRef(ref);
          }}
          handleArrows={handleArrows}
          onDestroy={() => handleFocus(-1)}
        />
      )}
    </div>
  );
};

export default BaseBlock;
