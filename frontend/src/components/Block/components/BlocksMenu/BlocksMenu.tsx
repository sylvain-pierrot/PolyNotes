import { Editor, FloatingMenu } from "@tiptap/react";
import { Avatar, List } from "antd";
import TextImage from "../../../../assets/images/text.png";
import Heading1Image from "../../../../assets/images/heading-1.png";
import Heading2Image from "../../../../assets/images/heading-2.png";
import Heading3Image from "../../../../assets/images/heading-3.png";
import Image from "../../../../assets/images/image.png";
import Database from "../../../../assets/images/database.png";
import BulletList from "../../../../assets/images/bullet-list.png";
import OrderedList from "../../../../assets/images/ordered-list.png";
import ToDoList from "../../../../assets/images/to-do-list.png";
import "./BlocksMenu.css";
import { BlockType } from "../../../../store/slices/pageSlice";
import { Level } from "@tiptap/extension-heading";

const blocksMenuItemsData = [
  {
    icon: TextImage,
    title: "Text",
    description: "Just start writing with plain text.",
    type: BlockType.TEXT,
  },
  {
    icon: Heading1Image,
    title: "Heading 1",
    description: "Big section heading.",
    type: BlockType.HEADING_1,
  },
  {
    icon: Heading2Image,
    title: "Heading 2",
    description: "Medium section heading.",
    type: BlockType.HEADING_2,
  },
  {
    icon: Heading3Image,
    title: "Heading 3",
    description: "Small section heading.",
    type: BlockType.HEADING_3,
  },
  {
    icon: BulletList,
    title: "Bulleted list",
    description: "Create a simple bulleted list.",
    type: BlockType.BULLET_LIST,
  },
  {
    icon: OrderedList,
    title: "Numbered list",
    description: "Create a list with numbering.",
    type: BlockType.ORDERED_LIST,
  },
  {
    icon: ToDoList,
    title: "To-do list",
    description: "Track tasks with a to-do list.",
    type: BlockType.TO_DO_LIST,
  },
  {
    icon: Image,
    title: "Image",
    description: "Embedded with a link.",
    type: BlockType.IMAGE,
  },
  {
    icon: Database,
    title: "Database",
    description: "Database with Kanban/Table views.",
    type: BlockType.TABLE,
  },
];

interface IPropsBlocksMenu {
  editor: Editor;
  updateContentAndChangeType: (newType: BlockType) => void;
}

const BlocksMenu: React.FC<IPropsBlocksMenu> = ({
  editor,
  updateContentAndChangeType,
}) => {
  return (
    <FloatingMenu
      editor={editor}
      tippyOptions={{
        duration: 100,
        placement: "bottom-start",
      }}
      shouldShow={({ editor }) => {
        return (
          editor.getText() === "/"
          // && editor.getJSON().content![0].type === "paragraph"
        );
      }}
    >
      <List className="floating-menu-list" split={false}>
        {blocksMenuItemsData.map(({ icon, title, description, type }) => (
          <List.Item
            key={type}
            onClick={() => {
              if (type.startsWith("heading")) {
                const level = Number(type.slice(-1)) as Level;

                editor
                  .chain()
                  .focus()
                  .clearContent()
                  .toggleHeading({ level })
                  .run();
              } else {
                updateContentAndChangeType(type as BlockType);
              }
            }}
          >
            <List.Item.Meta
              avatar={<Avatar shape="square" size={46} src={icon} />}
              title={title}
              description={description}
            />
          </List.Item>
        ))}
      </List>
    </FloatingMenu>
  );
};

export default BlocksMenu;
