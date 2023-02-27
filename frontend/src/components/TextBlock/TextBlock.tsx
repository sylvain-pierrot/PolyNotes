import React from "react";
import "./Block.css";

interface IPropsBlock {
  size: number;
  placeholder: string;
  content: string;
}

const Block: React.FC<IPropsBlock> = ({ size, placeholder, content }) => {
  return (
    <div className="block">
      <span
        style={{ fontSize: size }}
        spellCheck={true}
        placeholder={placeholder}
        contentEditable={true}
      >
        {content}
      </span>
    </div>
  );
};

export default Block;
