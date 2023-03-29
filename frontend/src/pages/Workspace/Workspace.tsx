import "./Workspace.css";
import withAuth from "../../hocs/withAuth";
import { Card, List } from "antd";
import FileExplorer from "../../components/FileExplorer/FileExplorer";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { getAllPages } from "../../boot/Pages";

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
  const treeData: Node | null = useSelector(
    (state: RootState) => state.fileSystemReducer.fileSystem
  );

  const [recents, setRecents] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const pageList = await getAllPages();
      setRecents(pageList);
      console.log(pageList);
    })();
  }, [treeData]);

  return (
    <>
      <h1>Recent</h1>

      {recents && (
        <List
          className="slider"
          split={false}
          dataSource={recents}
          renderItem={(item: any) => (
            <List.Item>
              <Card title={item.title}></Card>
            </List.Item>
          )}
        />
      )}

      {treeData && <FileExplorer treeData={treeData} />}
    </>
  );
}

export default withAuth(Workspace);
