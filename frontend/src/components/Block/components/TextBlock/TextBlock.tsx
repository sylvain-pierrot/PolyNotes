import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import "./TextBlock.css";

interface IPropsTextBlock {
  onChange: () => void;
}

const TextBlock: React.FC<IPropsTextBlock> = ({ onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onChange();
    }
  };

  return (
    <div className={"text-block"}>
      {/* <span
        spellCheck={true}
        placeholder={"Press 'space' for AI, '/' for commands..."}
        contentEditable={true}
        // onInput={handleInput}
      ></span> */}
      <EditorContent editor={editor} onKeyDown={handleKeyDown} />
    </div>
  );
};

export default TextBlock;
