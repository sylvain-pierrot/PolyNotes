import { Button } from "antd";
import { useNavigate } from "react-router";
import BrokenRobotImg from "../../assets/images/broken-robot-cuate.svg";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img width={500} src={BrokenRobotImg} alt="broken-robot-cuate" />
      <Button
        type={"primary"}
        style={{ marginTop: "3em" }}
        onClick={() => navigate("/")}
      >
        Go Home
      </Button>
    </div>
  );
};
export default NotFound;
