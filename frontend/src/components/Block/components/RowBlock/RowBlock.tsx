import React from "react";
import "./RowBlock.css";

interface IPropsRowBlock {
  items: React.ReactNode[];
}

const RowBlock: React.FC<IPropsRowBlock> = ({ items }) => {
  return (
    <div className="RowBlock">
      {items.map((item, i) => (
        <div key={i} style={{ width: `${100 / items.length}%` }}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default RowBlock;
