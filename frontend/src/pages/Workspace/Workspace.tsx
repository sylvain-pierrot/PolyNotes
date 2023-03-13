import "./Workspace.css";
import withAuth from "../../hocs/withAuth";
import Page from "../../components/Page/Page";
import { Block } from "../../store/slices/blocksSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";

function Workspace() {
  // Store
  const blocks: Block[] = useSelector(
    (state: RootState) => state.blocksReducer.blocks
  );
  const title: string | null = useSelector(
    (state: RootState) => state.titleReducer.title
  );

  // State
  const [currentTitle, setCurrentTitle] = useState(title);

  // Effect
  useEffect(() => {
    setCurrentTitle(title);
  }, [title]);

  return <Page title={currentTitle} blocks={blocks} />;
}

export default withAuth(Workspace);
