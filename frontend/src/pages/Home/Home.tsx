import { Button, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./Home.css";

function Home() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    setCurrent(current + 1);
  };

  const naviagteToLogin = () => {
    navigate("/login");
  };

  const naviagteToSignup = () => {
    navigate("/signup");
  };

  return (
    <Row justify={"center"}>
      <div className="card">
        {current === 0 && (
          <>
            <h1 style={{ fontSize: "2em" }}>
              Organize, Collaborate and Succeed
            </h1>
            <Button
              type="primary"
              size="large"
              className="bottom"
              onClick={next}
            >
              START
            </Button>
          </>
        )}
        {current === 1 && (
          <>
            <Button
              type="primary"
              size="large"
              className="button"
              onClick={naviagteToSignup}
            >
              Create an Account
            </Button>
            <Button
              type="primary"
              size="large"
              className="button"
              onClick={naviagteToLogin}
            >
              Login
            </Button>
          </>
        )}
      </div>
    </Row>
  );
}

export default Home;
