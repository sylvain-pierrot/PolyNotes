import React from "react";

interface IPropsColumnList {
  items: React.ReactNode[];
}

const ColumnListBlock: React.FC<IPropsColumnList> = ({ items }) => {
  const list: React.ReactNode[] = [];

  for (let i in items) {
    list.push(<div key={i}>{items[i]}</div>);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#777777",
      }}
    >
      {list}
    </div>
  );
};

export default ColumnListBlock;
