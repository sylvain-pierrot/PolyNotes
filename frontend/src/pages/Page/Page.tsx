import "./Page.css";
import PageContent from "../../components/PageContent/PageContent";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  Access,
  PageProperties,
  RoleAccess,
  updatePage,
  updatePageAccess,
} from "../../store/slices/pageSlice";
import { useEffect, useState } from "react";
import { getPageById, updatePageByid } from "../../boot/Pages";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTitleNodeById } from "../../store/slices/fileSystemSlice";
import { LoadingOutlined, SaveOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import SharingPage from "../../components/SharingContent/SharingPage";
import PrivatPageImg from "../../assets/images/Private-page.svg";

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
        title: pageBrut.page.title,
        blocks: pageBrut.page.blocks,
        author: pageBrut.page.author,
        owner: pageBrut.owner,
        access: pageBrut.page.access,
        roleAccess: pageBrut.page.roleAccess,
      };

      dispatch(updatePage({ page: currentPage }));
    };
    fetchPage();
  }, [params.id, dispatch]);

  // Update page and node title when page is updated
  useEffect(() => {
    if (
      (page && page.owner) ||
      (page.access === Access.PUBLIC && page.roleAccess === RoleAccess.Editor)
    ) {
      setIsRegistered(false);

      const updatePage = async () => {
        try {
          await updatePageByid(params.id!, page.title!, page.blocks);
          dispatch(
            updateTitleNodeById({ key: params.id, newTitle: page.title })
          );
        } catch (error) {
          // handle error
        } finally {
          setIsRegistered(true);
        }
      };

      const timeoutID = setTimeout(updatePage, 1500);

      return () => clearTimeout(timeoutID);
    }
  }, [page, params.id, dispatch]);

  const handleUpdateAccessPage = async (values: any) => {
    const access = values.access;
    const roleAccess = access === "public" ? values.roleAccess : null;
    const pageId = params.id!;
    dispatch(updatePageAccess({ pageId, access, roleAccess }));
  };

  // Render page content if author is not default
  return (
    <>
      {!page && <Spin indicator={<LoadingOutlined />} />}
      {!page.owner && page.access === Access.PRIVATE && (
        <img width={500} src={PrivatPageImg} alt="private-page" />
      )}
      {(page.owner || page.access === Access.PUBLIC) && (
        <Spin
          indicator={!isRegistered ? <LoadingOutlined /> : <SaveOutlined />}
          className="save-indicator"
        />
      )}

      {page.owner && (
        <SharingPage
          access={page.access}
          roleAccess={page.roleAccess}
          handleUpdateAccessPage={handleUpdateAccessPage}
        />
      )}

      {(page.owner || page.access === Access.PUBLIC) && (
        <PageContent
          page={page}
          editable={
            (page && page.owner) ||
            (page.access === Access.PUBLIC &&
              page.roleAccess === RoleAccess.Editor)
          }
        />
      )}
    </>
  );
};

export default Page;
