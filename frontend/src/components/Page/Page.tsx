import "./Page.css";
import React, { useRef } from "react";
import BaseBlock from "../Block/BaseBlock";
import { Editor } from "@tiptap/react";
import TitlePage from "../TitlePage/TitlePage";
import { PageProperties } from "../../store/slices/pageSlice";

interface IPropsPage {
  page: PageProperties;
}

const Page: React.FC<IPropsPage> = ({ page }) => {
  // Refs
  const refs = useRef<(Editor | null)[]>([]);
  const refTitle = useRef<Editor | null>(null);
  // Handles
  const handleFocus = (index: number, shift: number) => {
    let newIndex = index + shift;
    if (newIndex >= 0) {
      if (!refs.current[newIndex]?.isEditable) {
        refs.current[newIndex + shift]?.chain().focus().run();
      } else {
        refs.current[newIndex]?.chain().focus().run();
      }
    } else if (newIndex === -1) {
      refTitle.current?.chain().focus().run();
    }
  };

  return (
    <>
      <p className="title">{page.title ? page.title : "Untitled"}</p>

      <div className="page">
        <TitlePage
          content={page.title}
          ref={(ref) => {
            refTitle.current = ref;
          }}
          handleArrows={(event) => {
            const direction: Record<string, number> = {
              ArrowDown: 1,
            };
            if (direction[event.key] === 1) {
              handleFocus(0, 0);
            }
          }}
        />
        <div style={{ maxWidth: "100%", minWidth: 0, width: "900px" }}>
          {page.blocks.map((block, index) => (
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
