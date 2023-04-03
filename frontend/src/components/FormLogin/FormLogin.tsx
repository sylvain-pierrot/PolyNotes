import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "./FormLogin.css";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { ICredentials } from "../../boot/Auth";

interface IPropsFormLogin {
  login: (credentials: ICredentials) => void;
}

const FormLogin: React.FC<IPropsFormLogin> = ({ login }) => {
  // Handler for form submission
  const onFinish = async (values: any) => {
    const credentials: ICredentials = {
      email: values.email,
      password: values.password,
    };
    login(credentials);
  };

  return (
    <Form
      name="normal_login"
      initialValues={{ remember: false }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox className="float-left">Remember me</Checkbox>
        </Form.Item>

        <a className="float-right" href="/">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item className="text-left">
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormLogin;
