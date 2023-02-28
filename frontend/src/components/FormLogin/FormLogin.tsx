import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "./FormLogin.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import withAuth from "../../hocs/withAuth";

const FormLogin: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      name="normal_login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
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
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to={"/signup"}>register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default withAuth(FormLogin);
