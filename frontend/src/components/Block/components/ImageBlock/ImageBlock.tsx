import "./ImageBlock.css";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Editor, EditorContent, Extension, useEditor } from "@tiptap/react";
import { forwardRef, Ref, useCallback, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import {
  newBlock,
  updateContentBlockById,
} from "../../../../store/slices/pageSlice";

interface IPropsImageBlock {
  id: string;
  content: string | null;
}

const ImageBlock = forwardRef(
  ({ id, content }: IPropsImageBlock, ref: Ref<Editor | null>) => {
    // Store
    const dispatch = useDispatch();

    // Editor
    const editor = useEditor({
      extensions: [
        Extension.create({
          addKeyboardShortcuts() {
            return {
              Enter: () => {
                dispatch(newBlock({ id }));
                return true;
              },
            };
          },
        }),
        Document,
        Paragraph,
        Text,
        Image,
        Dropcursor,
      ],
      content: content,
      editable: false,
      onUpdate({ editor }) {
        if (!editor.isEmpty)
          dispatch(
            updateContentBlockById({ id: id, content: editor.getHTML() })
          );
      },
    });

    // Handles
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
        {editor.isEmpty && (
          <Button
            onClick={addImage}
            className="btn-image-block"
            icon={<FileImageOutlined />}
            size="large"
          >
            Add an image
          </Button>
        )}

        <EditorContent editor={editor} />
      </div>
    );
  }
);

export default ImageBlock;
