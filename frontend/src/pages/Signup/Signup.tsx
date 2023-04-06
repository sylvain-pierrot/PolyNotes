import "./Signup.css";
import Title from "antd/es/typography/Title";
import FormSignup from "../../components/FormSignup/FormSignup";
import { notification, Row } from "antd";
import { IUser, signupUser } from "../../boot/Auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.error({
      message: "Email already used",
      placement: "topRight",
    });
  };

  const handleSignup = async (user: IUser) => {
    try {
      await signupUser(user);
      navigate(`/verifyEmail/${user.email}`);
    } catch (error) {
      openNotification();
    }
  };

  return (
    <>
      {contextHolder}
      <Row justify={"center"}>
        <div className="card">
          <Title>Create an Account</Title>
          <FormSignup signup={handleSignup} />
        </div>
      </Row>
    </>
  );
};

export default Signup;
