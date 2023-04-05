import React, { memo, useState } from "react";
import { Button, Input } from "antd";
import "./SharingPage.css";
import { ShareAltOutlined } from "@ant-design/icons";
import { Access, RoleAccess } from "../../store/slices/pageSlice";
import ModalForm from "./ModalForm";

interface IPropsSharingContent {
  access: Access;
  roleAccess: RoleAccess | null;
  handleUpdateAccessPage: (values: any) => void;
}
const { TextArea } = Input;

const SharingPage: React.FC<IPropsSharingContent> = memo(
  ({ access, roleAccess, handleUpdateAccessPage }) => {
    // Define two state variables, `open` and `copied`, using the `useState` hook
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = React.useState(false);

    // Define a function `handleCopyClick` that is called when the "Copy" button is clicked
    const handleCopyClick = () => {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    };

    return (
      <div className="sharing-content">
        {access === Access.PUBLIC && (
          <div
            style={{ display: "flex", alignItems: "center", marginRight: 16 }}
          >
            <TextArea
              value={window.location.href}
              bordered={true}
              disabled
              autoSize={{ minRows: 1, maxRows: 1 }}
              style={{ marginRight: 4 }}
            ></TextArea>
            <Button onClick={handleCopyClick} disabled={copied}>
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        )}

        <Button
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
          icon={<ShareAltOutlined />}
        />

        <ModalForm
          open={open}
          onCreate={handleUpdateAccessPage}
          onCancel={() => {
            setOpen(false);
          }}
          access={access}
          roleAccess={roleAccess}
        />
      </div>
    );
  }
);

export default SharingPage;
