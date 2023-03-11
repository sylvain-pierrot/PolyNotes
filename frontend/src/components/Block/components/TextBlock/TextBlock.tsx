import {
  BubbleMenu,
  EditorContent,
  useEditor,
  FloatingMenu,
  Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import React, { forwardRef, Ref, useImperativeHandle } from "react";
import "./TextBlock.css";
import { Avatar, Button, List } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  HighlightOutlined,
  UnderlineOutlined,
} from "@ant-design/icons";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
// import Focus from "@tiptap/extension-focus";
import Heading from "@tiptap/extension-heading";
import TextImage from "../../../../assets/images/text.png";
import Heading1Image from "../../../../assets/images/heading-1.png";
import Heading2Image from "../../../../assets/images/heading-2.png";
import Heading3Image from "../../../../assets/images/heading-3.png";
import { Extension } from "@tiptap/core";
import { useDispatch } from "react-redux";
import { destroyBlock, newBlock } from "../../../../store/slices/blocksSlice";

interface IPropsTextBlock {
  id: string;
  content: string;
  type?: string;
  onDestroy: () => void;
  onArrowPressed?: (event: any) => void;
}

const TextBlock = forwardRef(
  (
    { id, content, onDestroy, onArrowPressed }: IPropsTextBlock,
    ref: Ref<Editor | null>
  ) => {
    // Extension
    const ShortcutsExtension = Extension.create({
      addKeyboardShortcuts() {
        return {
          Enter: () => {
            handleEnter();
            return true;
          },
          Backspace: ({ editor }) => {
            if (editor.isEmpty) {
              handleDestroyOnEmpty(id);
            }
            return false;
          },
        };
      },
    });

    // Editor
    const editor = useEditor({
      extensions: [
        ShortcutsExtension,
        StarterKit.configure({
          history: false,
        }),
        Highlight,
        Underline,
        Placeholder.configure({
          placeholder: ({ node }) => {
            if (node.type.name === "heading") {
              return `Heading ${node.attrs.level}`;
            }
            return "Press ‘space’ for AI, ‘/’ for commands…";
          },
        }),
        Heading.configure({
          levels: [1, 2, 3],
        }),
      ],
      autofocus: true,
    });

    // Store
    const dispatch = useDispatch();

    // Handles
    // const handleKeyDown = (e: React.KeyboardEvent) => {
    //   if (e.key === "Enter") {
    //     // onChange();
    //   }
    // };
    const handleEnter = () => {
      dispatch(newBlock());
    };
    const handleDestroyOnEmpty = (id: string) => {
      onDestroy();
      dispatch(destroyBlock({ id }));
    };

    useImperativeHandle(ref, () => editor, [editor]);

    return (
      <div className={"text-block"}>
        {editor && (
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
        )}
        {editor && (
          <FloatingMenu
            editor={editor}
            tippyOptions={{
              duration: 100,
              placement: "bottom-start",
            }}
            shouldShow={({ editor }) => {
              return (
                editor.getText() === "/"
                // && editor.getJSON().content![0].type === "paragraph"
              );
            }}
          >
            <List className="floating-menu-list" split={false}>
              <List.Item
                onClick={() => {
                  editor.chain().focus().clearContent().run();
                }}
              >
                <List.Item.Meta
                  avatar={<Avatar shape="square" size={46} src={TextImage} />}
                  title={"Text"}
                  description={"Just start writing with plain text."}
                />
              </List.Item>
              <List.Item
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .clearContent()
                    .toggleHeading({ level: 1 })
                    .run()
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar shape="square" size={46} src={Heading1Image} />
                  }
                  title={"Heading 1"}
                  description={"Big section heading."}
                />
              </List.Item>
              <List.Item
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .clearContent()
                    .toggleHeading({ level: 2 })
                    .run()
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar shape="square" size={46} src={Heading2Image} />
                  }
                  title={"Heading 2"}
                  description={"Medium section heading."}
                />
              </List.Item>
              <List.Item
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .clearContent()
                    .toggleHeading({ level: 3 })
                    .run()
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar shape="square" size={46} src={Heading3Image} />
                  }
                  title={"Heading 3"}
                  description={"Small section heading."}
                />
              </List.Item>
            </List>
          </FloatingMenu>
        )}
        <EditorContent
          content={content}
          editor={editor}
          onKeyDown={(event) => {
            // handleKeyDown();
            onArrowPressed?.(event);
          }}
        />
      </div>
    );
  }
);

export default TextBlock;
