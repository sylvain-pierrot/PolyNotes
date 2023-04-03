import { Button, Form, Input } from "antd";
import "./FormSignup.css";
import { IUser } from "../../boot/Auth";

interface IpropsFormLogin {
  signup: (user: IUser) => void;
}

const FormSignup: React.FC<IpropsFormLogin> = ({ signup }) => {
  const [form] = Form.useForm();

  // Handler for form submission
  const onFinish = (values: any) => {
    form.resetFields();
    const user: IUser = {
      email: values.email,
      username: values.nickname,
      password: values.password,
    };
    signup(user);
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
          {
            pattern: new RegExp(/^(?=.{8,50}$).*$/),
            message: "Value should be more than 8 character",
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
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormSignup;
