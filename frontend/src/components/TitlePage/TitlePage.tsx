import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDispatch } from "react-redux";
import { newBlock } from "../../store/slices/blocksSlice";
import "./TitlePage.css";
import Document from "@tiptap/extension-document";

interface IPropsTitlePage {
  content: string;
}

const TitlePage: React.FC<IPropsTitlePage> = ({ content }) => {
  // Extension
  const ShortcutsExtension = Extension.create({
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
      ShortcutsExtension,
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
      console.log(editor.getText());
    },
  });

  // Store
  const dispatch = useDispatch();

  // Handles
  const handleEnter = () => {
    dispatch(newBlock({}));
  };

  return <EditorContent editor={editor} className="page-title" />;
};

export default TitlePage;
