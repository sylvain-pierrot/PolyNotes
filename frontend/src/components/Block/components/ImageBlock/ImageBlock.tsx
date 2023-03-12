import "./ImageBlock.css";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Editor, EditorContent, Extension, useEditor } from "@tiptap/react";
import React, {
  forwardRef,
  Ref,
  useCallback,
  useImperativeHandle,
} from "react";
import { newBlock } from "../../../../store/slices/blocksSlice";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { FileImageOutlined } from "@ant-design/icons";

interface IPropsImageBlock {
  id: string;
  content: string;
  handleArrows?: (event: any) => void;
}

const ImageBlock = forwardRef(
  (
    { id, content, handleArrows }: IPropsImageBlock,
    ref: Ref<Editor | null>
  ) => {
    // Extension
    const ShortcutExtension = Extension.create({
      addKeyboardShortcuts() {
        return {
          Enter: () => {
            handleEnter();
            return true;
          },
        };
      },
    });

    // Editor
    const editor = useEditor({
      extensions: [
        ShortcutExtension,
        Document,
        Paragraph,
        Text,
        Image,
        Dropcursor,
      ],
      content: null,
      editable: false,
    });

    // Store
    const dispatch = useDispatch();

    // Handles
    const handleEnter = () => {
      dispatch(newBlock({ id }));
    };
    useImperativeHandle(ref, () => editor, [editor]);

    const addImage = useCallback(() => {
      const url = window.prompt("URL");

      if (url) {
        editor!.chain().focus().setImage({ src: url }).run();
      }
    }, [editor]);

    if (!editor) {
      return null;
    }

    return (
      <div className={"image-block"}>
        {editor && editor.isEmpty && (
          <Button
            onClick={addImage}
            className="btn-image-block"
            style={{ background: "#f2f1ee", color: "rgba(55, 53, 47, 0.65)" }}
            icon={<FileImageOutlined />}
            size="large"
          >
            Add an image
          </Button>
        )}

        <EditorContent
          editor={editor}
          onKeyDown={(event) => {
            handleArrows?.(event);
          }}
        />
      </div>
    );
  }
);

export default ImageBlock;
