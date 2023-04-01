import "./Login.css";
import Title from "antd/es/typography/Title";
import FormLogin from "../../components/FormLogin/FormLogin";
import { Row } from "antd";
import { ICredentials, loginUser } from "../../boot/Auth";
import withAuth from "../../hocs/withAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (credentials: ICredentials) => {
    try {
      await loginUser(credentials);
      navigate("/workspace");
    } catch (error) {
      console.error(error);
      // handle error here
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

export default withAuth(Login);
