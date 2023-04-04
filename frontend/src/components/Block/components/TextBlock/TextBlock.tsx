import { EditorContent, useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { forwardRef, Ref, useImperativeHandle } from "react";
import "./TextBlock.css";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
// import Focus from "@tiptap/extension-focus";
import Heading from "@tiptap/extension-heading";
import { Extension } from "@tiptap/core";
import { useDispatch } from "react-redux";
import RichEditor from "../RichEditor/RichEditor";
import BlocksMenu from "../BlocksMenu/BlocksMenu";
import {
  BlockType,
  changeToTypeBlock,
  destroyBlock,
  newBlock,
  updateContentBlockById,
} from "../../../../store/slices/pageSlice";

interface IPropsTextBlock {
  id: string;
  content: string | null;
  onDestroy: () => void;
  handleArrows?: (event: any) => void;
}

const TextBlock = forwardRef(
  (
    { id, content, onDestroy, handleArrows }: IPropsTextBlock,
    ref: Ref<Editor | null>
  ) => {
    // Store
    const dispatch = useDispatch();

    // Editor
    const editor = useEditor({
      content: content,
      extensions: [
        Extension.create({
          addKeyboardShortcuts() {
            return {
              Enter: () => {
                // Dispatch a new block action when "Enter" is pressed
                dispatch(newBlock({ id }));
                return true;
              },
              Backspace: ({ editor }) => {
                if (editor.isEmpty) {
                  // Call onDestroy and dispatch destroy block action when editor is empty and "Backspace" is pressed
                  onDestroy();
                  dispatch(destroyBlock({ id }));
                }
                return false;
              },
            };
          },
        }),
        StarterKit.configure({
          // Disable undo/redo, bullet list, list item, and ordered list
          history: false,
          bulletList: false,
          listItem: false,
          orderedList: false,
        }),
        Highlight,
        Underline,
        Placeholder.configure({
          placeholder: ({ node }) => {
            // Set placeholder for heading and normal text blocks
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
      onUpdate({ editor }) {
        // Dispatch an action to update the content when the editor content changes
        const content = editor.isEmpty ? "" : editor.getHTML();
        dispatch(updateContentBlockById({ id: id, content: content }));
      },
    });

    // Handle function to update content and change block type
    const updateContentAndChangeType = (newType: BlockType) => {
      dispatch(updateContentBlockById({ id, content: null }));
      dispatch(changeToTypeBlock({ id, type: newType }));
    };

    // Expose the editor instance to the parent component using ref
    useImperativeHandle(ref, () => editor, [editor]);

    return (
      <div className={"text-block"}>
        {editor && <RichEditor editor={editor} />}
        {editor && (
          <BlocksMenu
            editor={editor}
            updateContentAndChangeType={updateContentAndChangeType}
          />
        )}
        <EditorContent
          editor={editor}
          spellCheck={false}
          onKeyDown={(event) => {
            handleArrows?.(event);
          }}
        />
      </div>
    );
  }
);

export default TextBlock;
