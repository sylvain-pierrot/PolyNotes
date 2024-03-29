import OrderedList from "@tiptap/extension-ordered-list";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Placeholder from "@tiptap/extension-placeholder";
import Paragraph from "@tiptap/extension-paragraph";
import { Editor, EditorContent, Extension, useEditor } from "@tiptap/react";
import Text from "@tiptap/extension-text";
import { useDispatch } from "react-redux";
import Document from "@tiptap/extension-document";
import { forwardRef, Ref, useImperativeHandle } from "react";
import ListItem from "@tiptap/extension-list-item";
import {
  BlockType,
  destroyBlock,
  newBlock,
  updateContentBlockById,
} from "../../../../store/slices/pageSlice";
import BulletList from "@tiptap/extension-bullet-list";
import "./ListBlock.css";

interface IPropsListBlock {
  id: string;
  content: string | null;
  onDestroy: () => void;
  handleArrows: (event: any) => void;
  editable: boolean;
  listType:
    | BlockType.BULLET_LIST
    | BlockType.ORDERED_LIST
    | BlockType.TO_DO_LIST;
}

const ListBlock = forwardRef(
  (
    {
      id,
      content,
      onDestroy,
      handleArrows,
      listType,
      editable,
    }: IPropsListBlock,
    ref: Ref<Editor | null>
  ) => {
    // Store
    const dispatch = useDispatch();

    // Extension
    const ListBlockExtension = Extension.create({
      addKeyboardShortcuts() {
        return {
          Enter: ({ editor }) => {
            const lastNode = editor.state.doc.lastChild?.lastChild;
            let shouldDispatchNewBlock = false;

            if (lastNode) {
              const isLastNodeEmpty = !lastNode.textContent.trim();

              if (isLastNodeEmpty) {
                editor.commands.deleteCurrentNode();
              }

              shouldDispatchNewBlock = editor.isEmpty || isLastNodeEmpty;
            } else {
              shouldDispatchNewBlock = editor.isEmpty;
            }

            if (shouldDispatchNewBlock) {
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
    const listExtensions = {
      [BlockType.BULLET_LIST]: [
        BulletList,
        ListItem.extend({
          content: "text*",
        }),
      ],
      [BlockType.ORDERED_LIST]: [
        OrderedList,
        ListItem.extend({
          content: "text*",
        }),
      ],
      [BlockType.TO_DO_LIST]: [
        TaskList,
        TaskItem.extend({
          content: "text*",
        }),
        Paragraph,
      ],
    };

    const editor = useEditor({
      editable: editable,
      content: content
        ? content
        : listType === BlockType.TO_DO_LIST
        ? "<ul data-type='taskList'></ul>"
        : null,
      extensions: [
        Document,
        ListBlockExtension,
        Text,
        ...listExtensions[listType],
        Placeholder.configure({
          placeholder: () => {
            return "List...";
          },
        }),
      ],
      onUpdate({ editor }) {
        if (!editor.isEmpty)
          dispatch(
            updateContentBlockById({ id: id, content: editor.getHTML() })
          );
      },
      autofocus: true,
    });

    // Handles
    useImperativeHandle(ref, () => editor, [editor]);

    return (
      <EditorContent
        editor={editor}
        spellCheck={false}
        onKeyDown={(event) => {
          handleArrows(event);
        }}
      />
    );
  }
);

export default ListBlock;
