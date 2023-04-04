import "./Page.css";
import PageContent from "../../components/PageContent/PageContent";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { PageProperties, updatePage } from "../../store/slices/pageSlice";
import { useEffect, useState } from "react";
import { getPageById, updatePageByid } from "../../boot/Pages";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTitleNodeById } from "../../store/slices/fileSystemSlice";
import { LoadingOutlined, SaveOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Page = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [isRegistered, setIsRegistered] = useState(true);

  // Store
  const page: PageProperties | null = useSelector(
    (state: RootState) => state.pageReducer.page
  );

  // Fetch page by ID and update store
  useEffect(() => {
    const fetchPage = async () => {
      const pageBrut = await getPageById(params.id!);
      const currentPage = {
        title: pageBrut.title,
        blocks: pageBrut.blocks,
        author: pageBrut.author,
      };
      dispatch(updatePage({ page: currentPage }));
    };
    fetchPage();
  }, [params.id, dispatch]);

  // Update page and node title when page is updated
  useEffect(() => {
    setIsRegistered(false);
    const intervalID = setInterval(async () => {
      await updatePageByid(params.id!, page.title!, page.blocks);
      dispatch(updateTitleNodeById({ key: params.id, newTitle: page.title }));
      setIsRegistered(true);
    }, 1500);

    return () => clearInterval(intervalID);
  }, [page, params.id, dispatch]);

  // Render page content if author is not default
  return (
    <>
      {!isRegistered && (
        <Spin indicator={<LoadingOutlined spin />} className="save-indicator" />
      )}
      {isRegistered && (
        <Spin indicator={<SaveOutlined />} className="save-indicator" />
      )}

      {page?.author !== "default" && <PageContent page={page} />}
    </>
  );
};

export default Page;
