import { Button, Col, Form, Input, Row, Select } from "antd";
import Sider from "antd/es/layout/Sider";
import { Property } from "../../BaseDatabase";
import { CloseCircleOutlined } from "@ant-design/icons";

interface IPropsSiderForm {
  columns: { name: string; property: Property }[];
  newColumn: (column: { name: string; property: Property }) => void;
  closeSider: () => void;
}

const SiderForm: React.FC<IPropsSiderForm> = ({
  columns,
  newColumn,
  closeSider,
}) => {
  const [form] = Form.useForm<{ name: string; property: Property }>();

  // Handles
  const onFinish = (values: { name: string; property: Property }) => {
    newColumn(values);
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
        <p style={{ marginLeft: "5px" }}>New column</p>
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
              name="name"
              rules={[
                {
                  required: true,
                  validator(rule, value, callback) {
                    for (let i = 0; i < columns.length; i++) {
                      if (columns[i].name === value) {
                        return Promise.reject(
                          new Error("Name already exists!")
                        );
                      }
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Colomn name" />
            </Form.Item>
            <Form.Item
              name="property"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder={"Type"}
                style={{ width: "100%" }}
                options={[
                  { value: Property.TEXT, label: "Text" },
                  { value: Property.CHECKBOX, label: "Checkbox" },
                  { value: Property.DATE, label: "Date" },
                  { value: Property.TIME, label: "Time" },
                  {
                    value: Property.SINGLE_SELECT,
                    label: "Single Select",
                  },
                  { value: Property.NUMBER, label: "Number" },
                ]}
              />
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

export default SiderForm;
