import { BubbleMenu, Editor } from "@tiptap/react";
import { Button } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  HighlightOutlined,
  UnderlineOutlined,
} from "@ant-design/icons";
import "./RichEditor.css";

interface IPropsRichEditor {
  editor: Editor;
}

const RichEditor: React.FC<IPropsRichEditor> = ({ editor }) => {
  const toggleMark = (format: string) => {
    editor.chain().focus().toggleMark(format).run();
  };

  const marks = [
    { format: "bold", icon: <BoldOutlined /> },
    { format: "italic", icon: <ItalicOutlined /> },
    { format: "underline", icon: <UnderlineOutlined /> },
    { format: "strike", icon: <StrikethroughOutlined /> },
    { format: "highlight", icon: <HighlightOutlined /> },
  ];

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="text-action-menu"
    >
      {marks.map(({ format, icon }) => (
        <Button
          key={format}
          style={{ borderRadius: 0, transition: "none" }}
          onClick={() => toggleMark(format)}
          className={editor.isActive(format) ? "is-active" : ""}
          type="text"
          icon={icon}
        />
      ))}
    </BubbleMenu>
  );
};

export default RichEditor;
