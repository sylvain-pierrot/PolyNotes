import React from "react";
import "./RowBlock.css";

interface IPropsRowBlock {
  items: React.ReactNode[];
}

const RowBlock: React.FC<IPropsRowBlock> = ({ items }) => {
  return <div className="RowBlock">{items.map((item) => item)}</div>;
};

export default RowBlock;
