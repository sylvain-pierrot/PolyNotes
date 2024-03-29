import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import { Editor, EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDispatch } from "react-redux";
import "./PageTitle.css";
import Document from "@tiptap/extension-document";
import { forwardRef, Ref, useEffect, useImperativeHandle } from "react";
import { newBlock, updateTitle } from "../../store/slices/pageSlice";

interface IPropsTitlePage {
  content: string | null;
  editable: boolean;
  handleArrows: (event: any) => void;
}

const PageTitle = forwardRef(
  // Props and Ref
  (
    { content, editable, handleArrows }: IPropsTitlePage,
    ref: Ref<Editor | null>
  ) => {
    // Store
    const dispatch = useDispatch();

    // Extension
    const TitlePageExtension = Extension.create({
      addKeyboardShortcuts() {
        // Add Enter key shortcut to create new block
        return {
          Enter: () => {
            dispatch(newBlock({}));
            return true;
          },
        };
      },
    });

    // Custom Document type
    const CustomDocument = Document.extend({
      content: "heading block*",
    });

    // Editor setup with extensions and options
    const editor = useEditor({
      editable: editable,
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
        // Update store with new title content
        const content = editor.isEmpty ? "" : editor.getText();
        dispatch(updateTitle({ content: content }));
      },
    });

    // UseEffect
    useEffect(() => {
      if (editor) {
        editor.commands.setContent(content);
      }
    }, [editor, content]);

    // UseImperativeHandle to forward ref to parent component
    useImperativeHandle(ref, () => editor, [editor]);

    return (
      <EditorContent
        editor={editor}
        className="page-title"
        spellCheck={false}
        onKeyDown={(event) => {
          handleArrows(event);
        }}
      />
    );
  }
);

export default PageTitle;
