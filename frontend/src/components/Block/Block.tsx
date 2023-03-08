import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import "./Block.css";

interface IPropsBlock {
  children?: JSX.Element;
}

const Block: React.FC<IPropsBlock> = ({ children }) => {
  return (
    <div className="Block">
      <Button
        className="add-block"
        type="text"
        icon={<PlusOutlined />}
        size="middle"
      />
      {children}
    </div>
  );
};

export default Block;
