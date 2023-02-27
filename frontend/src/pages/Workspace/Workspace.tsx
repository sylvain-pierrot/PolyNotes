import "./Workspace.css";
import withAuth from "../../hocs/withAuth";
import Page from "../../components/Page/Page";

function Workspace() {
  return (
    <div className="page">
      <Page />
    </div>
  );
}

export default withAuth(Workspace);
