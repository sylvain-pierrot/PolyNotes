import { Button, Form, Input } from "antd";
import "./FormSignup.css";
import { useNavigate } from "react-router";
import withAuth from "../../hocs/withAuth";

const FormSignup: React.FC = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const navigateToLogin = () => navigate("/login");

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      layout={"vertical"}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="nickname"
        label="Nickname"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item className="text-left">
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        <Button
          type="default"
          className="margin-left"
          onClick={navigateToLogin}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default withAuth(FormSignup);
