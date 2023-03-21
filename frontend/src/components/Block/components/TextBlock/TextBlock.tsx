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
import {
  BlockType,
  changeToTypeBlock,
  destroyBlock,
  newBlock,
  updateContent,
} from "../../../../store/slices/blocksSlice";
import RichEditor from "../RichEditor/RichEditor";
import BlocksMenu from "../BlocksMenu/BlocksMenu";

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

    // Extension
    const TextBlockExtension = Extension.create({
      addKeyboardShortcuts() {
        return {
          Enter: () => {
            dispatch(newBlock({ id }));
            return true;
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
        TextBlockExtension,
        StarterKit.configure({
          history: false,
          bulletList: false,
          listItem: false,
          orderedList: false,
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
      onUpdate({ editor }) {
        const content = editor.isEmpty ? "" : editor.getHTML();
        dispatch(updateContent({ id: id, content: content }));
      },
    });

    // Handles
    const goImg = () => {
      dispatch(updateContent({ id: id, content: null }));
      dispatch(changeToTypeBlock({ id, type: BlockType.IMAGE }));
    };
    const goDatabase = () => {
      dispatch(updateContent({ id: id, content: null }));
      dispatch(changeToTypeBlock({ id, type: BlockType.TABLE }));
    };
    const goBulletList = () => {
      dispatch(updateContent({ id: id, content: null }));
      dispatch(changeToTypeBlock({ id, type: BlockType.BULLET_LIST }));
    };
    const goOrderedList = () => {
      dispatch(updateContent({ id: id, content: null }));
      dispatch(changeToTypeBlock({ id, type: BlockType.ORDERED_LIST }));
    };
    useImperativeHandle(ref, () => editor, [editor]);

    return (
      <div className={"text-block"}>
        {editor && <RichEditor editor={editor} />}
        {editor && (
          <BlocksMenu
            editor={editor}
            goImg={goImg}
            goDatabase={goDatabase}
            goBulletList={goBulletList}
            goOrderedList={goOrderedList}
          />
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

export default TextBlock;
