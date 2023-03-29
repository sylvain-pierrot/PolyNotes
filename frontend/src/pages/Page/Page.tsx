import "./Page.css";
import withAuth from "../../hocs/withAuth";
import PageComponent from "../../components/Page/Page";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { PageProperties } from "../../store/slices/pageSlice";
import { useEffect } from "react";
import { updatePage } from "../../boot/Pages";
import { useParams } from "react-router-dom";

function Page() {
  let params = useParams();

  // Store
  const page: PageProperties | null = useSelector(
    (state: RootState) => state.pageReducer.page
  );

  // UseEffect
  useEffect(() => {
    const intervalID = setTimeout(async () => {
      console.log(page);
      await updatePage(params.id!, page.title!, page.blocks);
    }, 2000);

    return () => clearInterval(intervalID);
  }, [page]);

  return <>{page.author !== "default" && <PageComponent page={page} />}</>;
}

export default withAuth(Page);
