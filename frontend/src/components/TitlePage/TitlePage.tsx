import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDispatch } from "react-redux";
import { newBlock } from "../../store/slices/blocksSlice";
import "./TitlePage.css";
import Document from "@tiptap/extension-document";
import { updateContent } from "../../store/slices/titleSlice";

interface IPropsTitlePage {
  content: string | null;
}

const TitlePage: React.FC<IPropsTitlePage> = ({ content }) => {
  // Store
  const dispatch = useDispatch();

  // Extension
  const TitlePageExtension = Extension.create({
    addKeyboardShortcuts() {
      return {
        Enter: () => {
          handleEnter();
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
      dispatch(updateContent({ content: editor.getText() }));
    },
  });

  // Handles
  const handleEnter = () => {
    dispatch(newBlock({}));
  };

  return <EditorContent editor={editor} className="page-title" />;
};

export default TitlePage;
