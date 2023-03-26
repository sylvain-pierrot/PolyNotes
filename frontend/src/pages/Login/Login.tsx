import "./Login.css";
import Title from "antd/es/typography/Title";
import FormLogin from "../../components/FormLogin/FormLogin";
import { notification, Row } from "antd";
import { ICredentials } from "../../boot/Auth";
import { api } from "../../boot/axios";
import { NotificationPlacement } from "antd/es/notification/interface";
import withAuth from "../../hocs/withAuth";

function Login() {
  const placement: NotificationPlacement = "topRight";
  const [notify, contextHolder] = notification.useNotification();

  const loginUser = async (credentials: ICredentials) => {
    try {
      const response = await api.post("/api/auth/login", credentials);
      notify.info({
        message: "Successful connection",
        duration: 3,
        placement,
      });
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

  const handleLogin = (credentials: ICredentials) => {
    const response = loginUser(credentials);
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
