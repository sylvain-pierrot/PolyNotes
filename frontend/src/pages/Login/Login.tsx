import "./Login.css";
import Title from "antd/es/typography/Title";
import FormLogin from "../../components/FormLogin/FormLogin";
import { notification, Row } from "antd";
import { ICredentials, loginUser } from "../../boot/Auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.error({
      message: "Credentials incorrects",
      placement: "topRight",
    });
  };

  const handleLogin = async (credentials: ICredentials) => {
    try {
      const login = await loginUser(credentials);
      localStorage.setItem("token", login.data.user.token);
      localStorage.setItem("username", login.data.user.username);
      navigate("/workspace");
    } catch (error) {
      openNotification();
    }
  };

  return (
    <>
      {contextHolder}
      <Row justify={"center"}>
        <div className="card">
          <Title>Login</Title>
          <FormLogin login={handleLogin} />
        </div>
      </Row>
    </>
  );
}

export default Login;
