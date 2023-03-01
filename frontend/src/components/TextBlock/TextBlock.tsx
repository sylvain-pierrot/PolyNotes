import React from "react";
import "./TextBlock.css";

interface IPropsTextBlock {
  dragOverlay?: boolean;
}

const TextBlock: React.FC<IPropsTextBlock> = ({ dragOverlay }) => {
  const handleInput = (e: any) => {
    console.log(e.target.innerText);
  };

  // const style = {
  //   cursor: dragOverlay ? "grabbing" : "grab",
  // };

  return (
    <div className={"block text-block"}>
      <span
        spellCheck={true}
        placeholder={"Press 'space' for AI, '/' for commands..."}
        contentEditable={true}
        onInput={handleInput}
      ></span>
    </div>
  );
};

export default TextBlock;
