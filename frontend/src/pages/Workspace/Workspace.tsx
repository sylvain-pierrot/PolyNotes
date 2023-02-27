import "./Workspace.css";
import withAuth from "../../hocs/withAuth";

function Workspace() {
  return (
    <>
      <h2>Recent</h2>
      <ul>
        <li>doc1</li>
        <li>doc2</li>
        <li>doc3</li>
        <li>doc4</li>
        <li>doc5</li>
      </ul>
    </>
  );
}

export default withAuth(Workspace);
