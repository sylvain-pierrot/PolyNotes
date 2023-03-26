import "./Login.css";
import Title from "antd/es/typography/Title";
import FormLogin from "../../components/FormLogin/FormLogin";
import { notification, Row } from "antd";
import { ICredentials } from "../../boot/Auth";
import { api } from "../../boot/axios";
import { NotificationPlacement } from "antd/es/notification/interface";
import withAuth from "../../hocs/withAuth";
import { useNavigate } from "react-router-dom";
import { setTimeout } from "timers/promises";

function Login() {
  const placement: NotificationPlacement = "topRight";
  const [notify, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const loginUser = async (credentials: ICredentials) => {
    try {
      const response = await api.post("/api/auth/login", credentials);
      notify.info({
        message: "Successful connection",
        duration: 3,
        placement,
      });
      navigate("/workspace");
      return response;
    } catch (error) {
      notify.info({
        message: "Connection failed",
        duration: 3,
        placement,
      });
      console.error(error);
    }
  };

  const handleLogin = async (credentials: ICredentials) => {
    const response = await loginUser(credentials);
    console.log(response);
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

export default withAuth(Login);
