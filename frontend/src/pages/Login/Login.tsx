import "./Login.css";
import Title from "antd/es/typography/Title";
import FormLogin from "../../components/FormLogin/FormLogin";
import { Row } from "antd";
import { ICredentials, loginUser } from "../../boot/Auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (credentials: ICredentials) => {
    let login: any;
    try {
      login = await loginUser(credentials);
    } catch (error) {
      throw new Error("Failed to login");
    } finally {
      localStorage.setItem("token", login.data.user.token);
      localStorage.setItem("username", login.data.user.username);
      navigate("/workspace");
    }
  };

  return (
    <Row justify={"center"}>
      <div className="card">
        <Title>Login</Title>
        <FormLogin login={handleLogin} />
      </div>
    </Row>
  );
}

export default Login;
