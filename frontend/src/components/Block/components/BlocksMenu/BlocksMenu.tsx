import { Editor, FloatingMenu } from "@tiptap/react";
import { Avatar, List } from "antd";
import TextImage from "../../../../assets/images/text.png";
import Heading1Image from "../../../../assets/images/heading-1.png";
import Heading2Image from "../../../../assets/images/heading-2.png";
import Heading3Image from "../../../../assets/images/heading-3.png";
import Image from "../../../../assets/images/image.png";
import Database from "../../../../assets/images/database.png";
import "./BlocksMenu.css";

interface IPropsBlocksMenu {
  editor: Editor;
  goImg: () => void;
  goDatabase: () => void;
}

const BlocksMenu: React.FC<IPropsBlocksMenu> = ({
  editor,
  goImg,
  goDatabase,
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
        <List.Item
          onClick={() => {
            editor.chain().focus().clearContent().run();
          }}
        >
          <List.Item.Meta
            avatar={<Avatar shape="square" size={46} src={TextImage} />}
            title={"Text"}
            description={"Just start writing with plain text."}
          />
        </List.Item>
        <List.Item
          onClick={() =>
            editor
              .chain()
              .focus()
              .clearContent()
              .toggleHeading({ level: 1 })
              .run()
          }
        >
          <List.Item.Meta
            avatar={<Avatar shape="square" size={46} src={Heading1Image} />}
            title={"Heading 1"}
            description={"Big section heading."}
          />
        </List.Item>
        <List.Item
          onClick={() =>
            editor
              .chain()
              .focus()
              .clearContent()
              .toggleHeading({ level: 2 })
              .run()
          }
        >
          <List.Item.Meta
            avatar={<Avatar shape="square" size={46} src={Heading2Image} />}
            title={"Heading 2"}
            description={"Medium section heading."}
          />
        </List.Item>
        <List.Item
          onClick={() =>
            editor
              .chain()
              .focus()
              .clearContent()
              .toggleHeading({ level: 3 })
              .run()
          }
        >
          <List.Item.Meta
            avatar={<Avatar shape="square" size={46} src={Heading3Image} />}
            title={"Heading 3"}
            description={"Small section heading."}
          />
        </List.Item>
        <List.Item onClick={() => goImg()}>
          <List.Item.Meta
            avatar={<Avatar shape="square" size={46} src={Image} />}
            title={"Image"}
            description={"Embeded with a link."}
          />
        </List.Item>
        <List.Item onClick={() => goDatabase()}>
          <List.Item.Meta
            avatar={<Avatar shape="square" size={46} src={Database} />}
            title={"Database"}
            description={"Database with Kanban/Table views."}
          />
        </List.Item>
      </List>
    </FloatingMenu>
  );
};

export default BlocksMenu;
