import BulletList from "@tiptap/extension-bullet-list";
import Placeholder from "@tiptap/extension-placeholder";
import { Editor, EditorContent, Extension, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
import Text from "@tiptap/extension-text";
import { useDispatch } from "react-redux";
import Document from "@tiptap/extension-document";
import { forwardRef, Ref, useImperativeHandle } from "react";
import ListItem from "@tiptap/extension-list-item";
import { destroyBlock, newBlock } from "../../../../store/slices/pageSlice";

interface IPropsBulletListBlock {
  id: string;
  content: string | null;
  onDestroy: () => void;
  handleArrows: (event: any) => void;
}

const BulletListBlock = forwardRef(
  (
    { id, content, onDestroy, handleArrows }: IPropsBulletListBlock,
    ref: Ref<Editor | null>
  ) => {
    // Store
    const dispatch = useDispatch();

    // Extension
    const ListBlockExtension = Extension.create({
      addKeyboardShortcuts() {
        return {
          Enter: ({ editor }) => {
            if (editor.isEmpty) {
              console.log(editor.getHTML());
              dispatch(newBlock({ id }));
              return true;
            }
            return false;
          },
          Backspace: ({ editor }) => {
            if (editor.isEmpty) {
              onDestroy();
              dispatch(destroyBlock({ id }));
            }
            return false;
          },
        };
      },
    });

    // Editor
    const editor = useEditor({
      content: content,
      extensions: [
        Document,
        ListBlockExtension,
        ListItem.extend({
          content: "text*",
        }),
        Text,
        BulletList,
        Placeholder.configure({
          placeholder: () => {
            return "List...";
          },
        }),
      ],
      autofocus: true,
    });

    // Handles
    useImperativeHandle(ref, () => editor, [editor]);

    return (
      <EditorContent
        editor={editor}
        className="page-title"
        onKeyDown={(event) => {
          handleArrows(event);
        }}
      />
    );
  }
);

export default BulletListBlock;
