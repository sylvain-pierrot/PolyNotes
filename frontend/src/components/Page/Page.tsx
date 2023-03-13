import "./Page.css";
import React, { useRef } from "react";
import BaseBlock from "../Block/BaseBlock";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Block } from "../../store/slices/blocksSlice";
import { Editor } from "@tiptap/react";
import TitlePage from "../TitlePage/TitlePage";

const Page: React.FC = () => {
  // Refs
  const refs = useRef<(Editor | null)[]>([]);

  // Store
  const blocks: Block[] = useSelector(
    (state: RootState) => state.blocksReducer.blocks
  );

  // Handles
  const handleFocus = (index: number, shift: number) => {
    let newIndex = index + shift;
    if (!refs.current[newIndex]?.isEditable) {
      refs.current[newIndex + shift]?.chain().focus().run();
    } else {
      refs.current[newIndex]?.chain().focus().run();
    }
  };

  return (
    <div className="page">
      <TitlePage content={"title"} />
      <div style={{ maxWidth: "100%", minWidth: 0, width: "900px" }}>
        {blocks.map((block, index) => (
          <BaseBlock
            key={block.id}
            block={block}
            goRef={(ref) => (refs.current[index] = ref)}
            handleFocus={(shift) => handleFocus(index, shift)}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
