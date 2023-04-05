import React, { useState } from "react";
import { Form, Modal, Radio, Switch } from "antd";
import "./SharingPage.css";
import { EditOutlined } from "@ant-design/icons";
import { Access, RoleAccess } from "../../store/slices/pageSlice";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  access: Access;
  roleAccess: RoleAccess | null;
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const ModalForm: React.FC<CollectionCreateFormProps> = ({
  access,
  roleAccess,
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [isPublic, setIsPublic] = useState(access === Access.PUBLIC);
  const handleIsPublic = (e: any) => {
    setIsPublic(e.target.value === Access.PUBLIC);
  };

  return (
    <Modal
      open={open}
      title="Sharing"
      okText="Save"
      cancelText="Cancel"
      onCancel={() => {
        onCancel();
        form.resetFields();
        setIsPublic(access === Access.PUBLIC);
        setComponentDisabled(true);
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
            setComponentDisabled(!componentDisabled);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      okButtonProps={{ disabled: componentDisabled }}
    >
      <Switch
        checked={!componentDisabled}
        onChange={() => setComponentDisabled(!componentDisabled)}
        checkedChildren={<EditOutlined />}
        unCheckedChildren={<EditOutlined />}
        style={{ margin: "2em 0" }}
      />

      <Form
        form={form}
        disabled={componentDisabled}
        initialValues={{ access: access, roleAccess: roleAccess }}
        layout={"vertical"}
      >
        <Form.Item label="Access" name="access" rules={[{ required: true }]}>
          <Radio.Group onChange={handleIsPublic}>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>
        {isPublic && (
          <>
            <Form.Item
              label="Role"
              name="roleAccess"
              rules={[
                { required: true, message: "Please select access level!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (getFieldValue("access") === "private" && !value) {
                      return Promise.reject(
                        "Please select access level for private access!"
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Radio.Group value={roleAccess}>
                <Radio value="editor">Editor</Radio>
                <Radio value="viewer">Viewer</Radio>
              </Radio.Group>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default ModalForm;
