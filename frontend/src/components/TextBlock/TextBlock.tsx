import React from "react";
import "./TextBlock.css";

interface IPropsBlock {
  placeholder: string;
  content: string;
  className: string | undefined;
}

const TextBlock: React.FC<IPropsBlock> = ({
  placeholder,
  content,
  className,
}) => {
  const handleInput = (e: any) => {
    console.log(e.target.innerText);
  };

  return (
    <div className={className}>
      <span
        spellCheck={true}
        placeholder={placeholder}
        contentEditable={true}
        onInput={handleInput}
      ></span>
    </div>
  );
};

export default TextBlock;
