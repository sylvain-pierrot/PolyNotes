import "./Workspace.css";
import withAuth from "../../hocs/withAuth";
import { Card, List } from "antd";
import FileExplorer from "../../components/FileExplorer/FileExplorer";
import { Node } from "../../components/FileExplorer/FileExplorer";

const data = [
  {
    title: "Title 1",
  },
  {
    title: "Title 2",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },
  {
    title: "Title 5",
  },
  {
    title: "Title 6",
  },
];

const treeData: Node = {
  title: "parent 1",
  key: "0-0",
  children: [
    {
      title: "parent 1-0",
      key: "0-0-0",
      children: [
        {
          title: "leaf",
          key: "0-0-0-0",
        },
        {
          title: "leaf",
          key: "0-0-0-1",
        },
        {
          title: "leaf",
          key: "0-0-0-2",
        },
      ],
    },
    {
      title: "parent 1-1",
      key: "0-0-1",
      children: [
        {
          title: "leaf",
          key: "0-0-1-0",
        },
      ],
    },
    {
      title: "parent 1-2",
      key: "0-0-2",
      children: [
        {
          title: "leaf",
          key: "0-0-2-0",
        },
        {
          title: "leaf",
          key: "0-0-2-1",
        },
      ],
    },
  ],
};

function Workspace() {
  return (
    <>
      <h1>Recent</h1>
      <List
        className="slider"
        split={false}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}></Card>
          </List.Item>
        )}
      />
      <FileExplorer treeData={treeData} />
    </>
  );
}

export default withAuth(Workspace);
