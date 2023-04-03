import "./Workspace.css";
import { Card, List } from "antd";
import FileExplorer from "../../components/FileExplorer/FileExplorer";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { getAllPages } from "../../boot/Pages";
import { useNavigate } from "react-router";

const Workspace = () => {
  const naviagte = useNavigate();
  const treeData: Node | null = useSelector(
    (state: RootState) => state.fileSystemReducer.fileSystem
  );
  const [recentPages, setRecentPages] = useState<any[]>([]);

  // fetch list of recent pages and update state
  useEffect(() => {
    const fetchRecentPages = async () => {
      const pageList = await getAllPages(); // function to fetch recent pages from server
      setRecentPages(pageList); // update state with recent pages
    };
    fetchRecentPages();
  }, [treeData]); // re-fetch recent pages whenever tree data changes

  return (
    <>
      <h1>Recent</h1>

      {recentPages && (
        <List
          className="slider"
          split={false}
          dataSource={recentPages}
          renderItem={(item: any) => (
            <List.Item>
              <Card
                title={item.title}
                onClick={() => naviagte(`/page/${item._id}`)}
              ></Card>
            </List.Item>
          )}
        />
      )}

      {treeData && <FileExplorer treeData={treeData} />}
    </>
  );
};

export default Workspace;
