import "./Signup.css";
import Title from "antd/es/typography/Title";
import FormSignup from "../../components/FormSignup/FormSignup";
import { Row } from "antd";

function Signup() {
  return (
    <Row justify={"center"}>
      <div className="card">
        <Title>Create an Account</Title>
        <FormSignup />
      </div>
    </Row>
  );
}

export default Signup;
