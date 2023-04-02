import "./Workspace.css";
import { Card, List } from "antd";
import FileExplorer from "../../components/FileExplorer/FileExplorer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { getAllPages } from "../../boot/Pages";
import { updateFileSystem } from "../../store/slices/fileSystemSlice";
import { getFileSystem } from "../../boot/FileSystem";

function Workspace() {
  const dispatch = useDispatch();
  // Store
  const treeData: Node | null = useSelector(
    (state: RootState) => state.fileSystemReducer.fileSystem
  );
  const [recents, setRecents] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const tree = await getFileSystem();
      dispatch(updateFileSystem({ tree }));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const pageList = await getAllPages();
      setRecents(pageList);
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

export default Workspace;
