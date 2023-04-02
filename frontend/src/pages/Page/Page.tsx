import "./Page.css";
import PageContent from "../../components/PageContent/PageContent";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { PageProperties, updatePage } from "../../store/slices/pageSlice";
import { useEffect } from "react";
import { getPageById, updatePageByid } from "../../boot/Pages";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

function Page() {
  const params = useParams();
  const dispatch = useDispatch();

  // Store
  const page: PageProperties | null = useSelector(
    (state: RootState) => state.pageReducer.page
  );

  // UseEffect
  useEffect(() => {
    (async () => {
      const pageBrut = await getPageById(params.id!);
      const currentPage = {
        title: pageBrut.title,
        blocks: pageBrut.blocks,
        author: pageBrut.author,
      };

      dispatch(updatePage({ page: currentPage }));
    })();
  }, []);

  useEffect(() => {
    const intervalID = setTimeout(async () => {
      console.log(page);
      await updatePageByid(params.id!, page.title!, page.blocks);
    }, 2000);

    return () => clearInterval(intervalID);
  }, [page]);

  return <>{page.author !== "default" && <PageContent page={page} />}</>;
}

export default Page;
