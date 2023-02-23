import React from "react";
import { Button, Form, Input, Checkbox, Row, Col } from "antd";
import { Rule } from "antd/es/form";
import "./FormSignup.css";
import { useNavigate } from "react-router";

const FormSignup: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onClick = () => navigate("/");

  const ruleEmail: Rule = {
    type: "email" as const,
    required: true,
    message: "Please select time!",
  };

  const ruleString: Rule = {
    type: "string" as const,
    required: true,
    message: "Please select time!",
  };

  return (
    <Form layout={"vertical"} form={form}>
      <Form.Item label="Nickname" rules={[{ required: true }]} required>
        <Input placeholder="Enter a nickname of your choice." />
      </Form.Item>
      <Form.Item label="Email" rules={[ruleString]} required>
        <Input placeholder="Enter a valid email address." />
      </Form.Item>
      <Form.Item label="Password" required>
        <Input placeholder="Enter a password with at least 8 characters." />
      </Form.Item>
      <Form.Item label="Password confirmation" required>
        <Input placeholder="Confirm your password by entering it again." />
      </Form.Item>
      <Form.Item required>
        <Checkbox.Group className="left">
          <Checkbox value="A" className="mg-bottom">
            Check this box if you are 13 years or older.
          </Checkbox>
          <Checkbox value="B">
            Accept CGU checkbox: Check this box to indicate that you agree to
            the terms and conditions of use.
          </Checkbox>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          xs: { span: 24, offset: 0 },
        }}
      >
        <Row gutter={[8, 0]}>
          <Col>
            <Button type="primary">Submit</Button>
          </Col>
          <Col>
            <Button htmlType="button" onClick={onClick}>
              Go back
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default FormSignup;
