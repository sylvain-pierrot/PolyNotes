import { Button, Col, Form, Input, Row } from "antd";
import Sider from "antd/es/layout/Sider";
import { CloseCircleOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { DataType } from "../../../../../../utils/utils";

interface IPropsSiderForm {
  containers: {
    id: string;
    title: string;
    items: DataType[];
  }[];
  newContainer: (container: {
    id: string;
    title: string;
    items: DataType[];
  }) => void;
  closeSider: () => void;
}

const SiderFormContainer: React.FC<IPropsSiderForm> = ({
  containers,
  newContainer,
  closeSider,
}) => {
  const [form] = Form.useForm<{ title: string }>();

  // Handles
  const onFinish = (values: { title: string }) => {
    const container = { id: uuidv4(), title: values.title, items: [] };
    newContainer(container);
    form.resetFields();
    closeSider();
  };

  return (
    <Sider className="sider-new-col" theme="light">
      <Row
        align={"middle"}
        justify={"space-between"}
        style={{ padding: "4px" }}
      >
        <p style={{ marginLeft: "5px" }}>New container</p>
        <Button
          type="text"
          shape="circle"
          icon={<CloseCircleOutlined />}
          size={"small"}
          onClick={closeSider}
        />
      </Row>
      <Row justify={"center"}>
        <Col span={20}>
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish}
          >
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  validator(rule, value, callback) {
                    for (let i = 0; i < containers.length; i++) {
                      if (containers[i].title === value) {
                        return Promise.reject(
                          new Error("Container with this title already exists!")
                        );
                      }
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Container title" />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Sider>
  );
};

export default SiderFormContainer;
