import { Button } from "antd";
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
    <>
      {current === 0 && (
        <>
          <p>Manifesto!</p>
          <Button type="primary" size="large" className="bottom" onClick={next}>
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
    </>
  );
}

export default Home;
