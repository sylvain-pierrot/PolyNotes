import "./Login.css";
import Title from "antd/es/typography/Title";
import FormLogin from "../../components/FormLogin/FormLogin";
import { Row } from "antd";

function Login() {
  return (
    <Row justify={"center"}>
      <div className="card">
        <Title>Login</Title>
        <FormLogin />
      </div>
    </Row>
  );
}

export default Login;
