import "./Workspace.css";
import withAuth from "../../hocs/withAuth";
import { Card, List } from "antd";
import FileExplorer from "../../components/FileExplorer/FileExplorer";
import { Node } from "../../boot/FileSystem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

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

function Workspace() {
  // Store
  const treeData: Node = useSelector(
    (state: RootState) => state.fileSystemReducer.fileSystem
  );

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
