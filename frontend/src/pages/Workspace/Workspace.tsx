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
  const [pageSize, setPageSize] = useState(4);

  // Trigger PageSize
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 900; // md breakpoint is 768px
      setPageSize(isSmallScreen ? 2 : 5);
    };
    handleResize(); // set initial page size based on window size
    window.addEventListener("resize", handleResize); // update page size when window size changes
    return () => {
      window.removeEventListener("resize", handleResize); // cleanup
    };
  }, []);

  // fetch list of recent pages and update state
  useEffect(() => {
    const fetchRecentPages = async () => {
      const pageList = await getAllPages();
      setRecentPages(pageList);
    };
    fetchRecentPages();
  }, [treeData]);

  // Format Date
  function formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZone: "UTC",
    };
    return new Date(date).toLocaleString("en-US", options);
  }

  return (
    <>
      <h1>Recent</h1>

      {recentPages && (
        <List
          pagination={{
            position: "bottom",
            align: "center",
            // defaultPageSize: 4,
            pageSize: pageSize,
            // responsive: true,
            simple: true,
          }}
          className="slider"
          split={false}
          grid={{ gutter: 16, column: pageSize }}
          dataSource={recentPages}
          renderItem={(item: any) => (
            <List.Item>
              <Card
                onClick={() => naviagte(`/page/${item._id}`)}
                className="recent-page"
              >
                <h2 style={{ marginTop: 16 }}>{item.title}</h2>
                <div className="margin"></div>
                <p
                // style={{
                //   color: "#999",
                //   fontSize: "14px",
                //   marginTop: "8px",
                // }}
                >
                  {formatDate(item.updated)}
                </p>
              </Card>
            </List.Item>
          )}
        />
      )}

      {treeData && <FileExplorer treeData={treeData} />}
    </>
  );
};
export default Workspace;
