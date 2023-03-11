import { EditorContent, useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import React, { forwardRef, Ref, useImperativeHandle } from "react";
import "./TextBlock.css";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
// import Focus from "@tiptap/extension-focus";
import Heading from "@tiptap/extension-heading";
import { Extension } from "@tiptap/core";
import { useDispatch } from "react-redux";
import { destroyBlock, newBlock } from "../../../../store/slices/blocksSlice";
import RichEditor from "../RichEditor/RichEditor";
import BlocksMenu from "../BlocksMenu/BlocksMenu";

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
            return "Press ‘/’ for commands…";
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
        {editor && <RichEditor editor={editor} />}
        {editor && <BlocksMenu editor={editor} />}
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
