import { UniqueIdentifier } from "@dnd-kit/core";
import React, { useState } from "react";
import "./TextBlock.css";

interface IPropsTextBlock {
  id: UniqueIdentifier;
}

const TextBlock: React.FC<IPropsTextBlock> = ({ id }) => {
  const [content, setContent] = useState();

  const handleInput = (e: any) => {
    setContent(e.target.innerText);
  };

  return (
    <div className={"text-block"}>
      <span
        spellCheck={true}
        placeholder={"Press 'space' for AI, '/' for commands..."}
        contentEditable={true}
        onInput={handleInput}
      >
        {content}
      </span>
    </div>
  );
};

export default TextBlock;
