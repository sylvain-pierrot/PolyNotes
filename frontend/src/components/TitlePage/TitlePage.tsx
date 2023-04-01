import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import { Editor, EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDispatch } from "react-redux";
import "./TitlePage.css";
import Document from "@tiptap/extension-document";
import { forwardRef, Ref, useImperativeHandle } from "react";
import { newBlock, updateTitle } from "../../store/slices/pageSlice";

interface IPropsTitlePage {
  content: string | null;
  handleArrows: (event: any) => void;
}

const TitlePage = forwardRef(
  ({ content, handleArrows }: IPropsTitlePage, ref: Ref<Editor | null>) => {
    // Store
    const dispatch = useDispatch();

    // Extension
    const TitlePageExtension = Extension.create({
      addKeyboardShortcuts() {
        return {
          Enter: () => {
            dispatch(newBlock({}));
            return true;
          },
        };
      },
    });

    const CustomDocument = Document.extend({
      content: "heading block*",
    });

    // Editor
    const editor = useEditor({
      content: content,
      extensions: [
        TitlePageExtension,
        CustomDocument,
        StarterKit.configure({
          document: false,
          hardBreak: false,
        }),
        Heading.configure({ levels: [1] }),
        Placeholder.configure({
          placeholder: () => {
            return "Untitled";
          },
        }),
      ],
      enableInputRules: false,
      enablePasteRules: false,
      autofocus: true,
      onUpdate({ editor }) {
        dispatch(updateTitle({ content: editor.getText() }));
      },
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

export default TitlePage;
