import OrderedList from "@tiptap/extension-ordered-list";
import Placeholder from "@tiptap/extension-placeholder";
import { Editor, EditorContent, Extension, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
import Text from "@tiptap/extension-text";
import { useDispatch } from "react-redux";
import { destroyBlock, newBlock } from "../../../../store/slices/blocksSlice";
import Document from "@tiptap/extension-document";
import { forwardRef, Ref, useImperativeHandle } from "react";
import ListItem from "@tiptap/extension-list-item";

interface IPropsOrderedListBlock {
  id: string;
  content: string | null;
  onDestroy: () => void;
  handleArrows: (event: any) => void;
}

const OrderedListBlock = forwardRef(
  (
    { id, content, onDestroy, handleArrows }: IPropsOrderedListBlock,
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
        OrderedList,
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

export default OrderedListBlock;
