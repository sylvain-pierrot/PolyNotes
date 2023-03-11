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
  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="text-action-menu"
    >
      <Button
        style={{ borderRadius: 0, transition: "none" }}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
        type="text"
        icon={<BoldOutlined />}
      />

      <Button
        style={{ borderRadius: 0, transition: "none" }}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
        type="text"
        icon={<ItalicOutlined />}
      />

      <Button
        style={{ borderRadius: 0, transition: "none" }}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
        type="text"
        icon={<UnderlineOutlined />}
      />

      <Button
        style={{ borderRadius: 0, transition: "none" }}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
        type="text"
        icon={<StrikethroughOutlined />}
      />

      <Button
        style={{ borderRadius: 0, transition: "none" }}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive("highlight") ? "is-active" : ""}
        type="text"
        icon={<HighlightOutlined />}
      />
    </BubbleMenu>
  );
};

export default RichEditor;
