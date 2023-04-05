import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useMemo, useState } from "react";
import "./BaseBlock.css";
import TextBlock from "./components/TextBlock/TextBlock";
import { Editor } from "@tiptap/react";
import { useDispatch } from "react-redux";
import ImageBlock from "./components/ImageBlock/ImageBlock";
import BaseDatabase from "./components/Database/BaseDatabase";
import {
  Block,
  BlockType,
  destroyBlock,
  newBlock,
} from "../../store/slices/pageSlice";
import ListBlock from "./components/ListBlock/ListBlock";

interface IPropsBlock {
  block: Block;
  editable: boolean;
  goRef: (ref: Editor | null) => void;
  handleFocus: (shift: number) => void;
}

const BaseBlock: React.FC<IPropsBlock> = React.memo(
  ({ block, editable, goRef, handleFocus }) => {
    // States
    const [ref, setRef] = useState<Editor | null>(null);

    // Store
    const dispatch = useDispatch();
    const memoizedDispatch = useMemo(() => dispatch, [dispatch]);

    // Handles
    const handleDestroyBlock = () => {
      memoizedDispatch(destroyBlock({ id: block.id }));
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
        {editable && (
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
                  memoizedDispatch(newBlock({ id: block.id, content: "/" }));
                }
              }}
            />
          </div>
        )}

        {block.type === BlockType.TEXT && (
          <TextBlock
            id={block.id}
            content={block.content}
            ref={(ref) => {
              goRef(ref);
              setRef(ref);
            }}
            handleArrows={handleArrows}
            onDestroy={() => handleFocus(-1)}
            editable={editable}
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
        {(block.type === BlockType.BULLET_LIST ||
          block.type === BlockType.ORDERED_LIST ||
          block.type === BlockType.TO_DO_LIST) && (
          <ListBlock
            id={block.id}
            content={block.content}
            ref={(ref) => {
              goRef(ref);
              setRef(ref);
            }}
            handleArrows={handleArrows}
            onDestroy={() => handleFocus(-1)}
            listType={block.type}
            editable={editable}
          />
        )}
      </div>
    );
  }
);

export default BaseBlock;
