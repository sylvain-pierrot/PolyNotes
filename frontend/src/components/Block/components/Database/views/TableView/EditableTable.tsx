import { Form } from "antd";
import React from "react";
import { EditableContext } from "./TableView";

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props}></tr>
      </EditableContext.Provider>
    </Form>
  );
};

export default EditableRow;
