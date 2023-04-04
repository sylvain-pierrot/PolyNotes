import "./Signup.css";
import Title from "antd/es/typography/Title";
import FormSignup from "../../components/FormSignup/FormSignup";
import { Row } from "antd";
import { IUser, signupUser } from "../../boot/Auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (user: IUser) => {
    try {
      await signupUser(user);
      navigate(`/verifyEmail/${user.email}`);
    } catch (error) {
      console.error(error);
      // handle error here
    }
  };

  return (
    <Row justify={"center"}>
      <div className="card">
        <Title>Create an Account</Title>
        <FormSignup signup={handleSignup} />
      </div>
    </Row>
  );
};

export default Signup;
