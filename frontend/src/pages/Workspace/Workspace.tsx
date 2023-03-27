import "./Workspace.css";
import withAuth from "../../hocs/withAuth";
import { Card, List } from "antd";
import FileExplorer from "../../components/FileExplorer/FileExplorer";
import { Node } from "../../boot/FileSystem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { updateFileSystem } from "../../store/slices/fileSystemSlice";
import { useLoaderData } from "react-router";

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
  // Loader
  const tree: any = useLoaderData();
  console.log(tree);

  // Store
  const dispatch = useDispatch();
  dispatch(updateFileSystem({ tree }));

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
