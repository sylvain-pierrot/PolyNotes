import { Button, Row } from "antd";
import { useNavigate } from "react-router";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/signup");
  };

  return (
    <Row justify="center">
      <div className="card">
        <h1 style={{ fontSize: "2em" }}>Organize, Collaborate and Succeed</h1>
        <Button
          type="primary"
          size="large"
          className="bottom"
          onClick={handleStartClick}
        >
          START
        </Button>
      </div>
    </Row>
  );
}

export default Home;
