import "./Page.css";
import React, { useRef } from "react";
import BaseBlock from "../Block/BaseBlock";
import { Block } from "../../store/slices/blocksSlice";
import { Editor } from "@tiptap/react";
import TitlePage from "../TitlePage/TitlePage";

interface IPropsPage {
  title: string | null;
  blocks: Block[];
}

const Page: React.FC<IPropsPage> = ({ title, blocks }) => {
  // Refs
  const refs = useRef<(Editor | null)[]>([]);

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
    <>
      <p className="title">{title ? title : "Untitled"}</p>

      <div className="page">
        <TitlePage content={title} />
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
    </>
  );
};

export default Page;
