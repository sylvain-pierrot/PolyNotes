import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Editor, EditorContent, Extension, useEditor } from "@tiptap/react";
import {
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { Select } from "antd";
import Link from "@tiptap/extension-link";
import {
  newBlock,
  updateContentBlockById,
} from "../../../../store/slices/pageSlice";
import "./SubPageBlock.css";
import { FileTextOutlined } from "@ant-design/icons";
import { getAllPages } from "../../../../boot/Pages";

interface IPropsImageBlock {
  id: string;
  content: string | null;
}

const SubPageBlock = forwardRef(
  ({ id, content }: IPropsImageBlock, ref: Ref<Editor | null>) => {
    const [pages, setPages] = useState([]);

    // Store
    const dispatch = useDispatch();

    // fetch list of recent pages and update state
    useEffect(() => {
      const fetchRecentPages = async () => {
        const pageList = await getAllPages();
        const pagesOptions = pageList.map((page: any) => {
          return {
            label: page.title,
            value: `${window.location.origin}/page/${page._id}`,
          };
        });
        setPages(pagesOptions);
      };
      fetchRecentPages();
    }, []);

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
        Link,
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
      onSelectionUpdate({ editor }) {
        if (!editor.isEmpty)
          dispatch(
            updateContentBlockById({ id: id, content: editor.getHTML() })
          );
      },
    });

    // Handles
    useImperativeHandle(ref, () => editor, [editor]);

    const handleChange = useCallback(
      (value: any) => {
        editor!
          .chain()
          .setContent(value)
          .selectAll()
          //   .extendMarkRange("link")
          .setLink({ href: value })
          .run();
      },
      [editor]
    );

    if (!editor) {
      return null;
    }

    return (
      <div className={"sub-page"}>
        {editor.isEmpty && (
          <Select
            placeholder="Search for a page..."
            style={{ width: 200 }}
            bordered={false}
            onChange={handleChange}
            options={[
              {
                label: "Select a page",
                options: pages,
              },
            ]}
          />
        )}

        <div style={{ position: "relative" }}>
          <EditorContent editor={editor} />
          {!editor.isEmpty && (
            <FileTextOutlined
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          )}
        </div>
      </div>
    );
  }
);

export default SubPageBlock;
