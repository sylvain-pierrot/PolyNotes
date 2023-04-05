import "./PageContent.css";
import React, { useRef } from "react";
import BaseBlock from "../Block/BaseBlock";
import { Editor } from "@tiptap/react";
import TitlePage from "../PageTitle/PageTitle";
import { PageProperties } from "../../store/slices/pageSlice";

interface IPropsPage {
  page: PageProperties;
  editable: boolean;
}

const PageContent: React.FC<IPropsPage> = ({ page, editable }) => {
  // Refs for storing references to the Editor instances
  const refs = useRef<(Editor | null)[]>([]);
  const refTitle = useRef<Editor | null>(null);

  // Handle function for handling arrow key presses and shifting focus between the editors
  const handleFocus = (index: number, shift: number) => {
    let newIndex = index + shift;

    // If the new index is valid, check if the Editor at that index is editable
    if (newIndex >= 0) {
      if (!refs.current[newIndex]?.isEditable) {
        // If the Editor is not editable, shift focus to the next editable Editor
        refs.current[newIndex + shift]?.chain().focus().run();
      } else {
        // Otherwise, shift focus to the Editor at the new index
        refs.current[newIndex]?.chain().focus().run();
      }
    } else if (newIndex === -1) {
      // If the new index is -1, shift focus to the title Editor
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
          editable={editable}
        />
        <div style={{ maxWidth: "100%", minWidth: 0, width: "900px" }}>
          {page.blocks.map((block, index) => (
            <BaseBlock
              key={block.id}
              block={block}
              goRef={(ref) => (refs.current[index] = ref)}
              handleFocus={(shift) => handleFocus(index, shift)}
              editable={editable}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PageContent;
