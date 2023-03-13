import "./Workspace.css";
import withAuth from "../../hocs/withAuth";
import Page from "../../components/Page/Page";

function Workspace() {
  return <Page />;
}

export default withAuth(Workspace);
