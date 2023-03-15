import {
  Checkbox,
  Dropdown,
  Form,
  FormInstance,
  Input,
  InputNumber,
  InputRef,
  MenuProps,
  TimePicker,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Property, DataType } from "../../BaseDatabase";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";

// Interfaces
interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof DataType;
  record: DataType;
  property: Property;
  render: any;
  handleSave: (record: DataType) => void;
  handleDeleteRow: (key: React.Key) => void;
}

interface EditableRowProps {
  index: number;
}

dayjs.extend(customParseFormat);

const EditableContext = React.createContext<FormInstance<any> | null>(null);

// EditableRow
export const EditableRow: React.FC<EditableRowProps> = ({
  index,
  ...props
}) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} style={{ position: "relative" }}></tr>
      </EditableContext.Provider>
    </Form>
  );
};

// EditableCell
export const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  property,
  render,
  handleSave,
  handleDeleteRow,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  // Handles
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  const handleRender = (render: any) => {
    if (render instanceof dayjs) {
      render = (render as Dayjs).format("HH-mm-ss");
    }
    return render;
  };
  // const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setName(event.target.value);
  // };

  // const [items, setItems] = useState(["jack", "lucy"]);
  // const [name, setName] = useState("");

  // const addItem = (
  //   e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  // ) => {
  //   e.preventDefault();
  //   setItems([...items, name]);
  //   setName("");
  //   setTimeout(() => {
  //     inputRef.current?.focus();
  //   }, 0);
  // };

  const childNode = editing ? (
    <Form.Item
      style={{ margin: 0 }}
      name={dataIndex}
      rules={[
        {
          required: true,
          message: `${title} is required.`,
        },
      ]}
    >
      {(() => {
        switch (property) {
          case Property.TEXT:
            return <Input ref={inputRef} onPressEnter={save} onBlur={save} />;
          case Property.NUMBER:
            return (
              <InputNumber
                ref={inputRef as any}
                stringMode={false}
                min={1}
                max={10000}
                onBlur={save}
                onPressEnter={save}
              />
            );
          // case ColumnType.SINGLE_SELECT:
          //   return (
          //     <Select
          //       ref={inputRef as any}
          //       onChange={save}
          //       style={{ width: 300 }}
          //       placeholder="custom dropdown render"
          //       dropdownRender={(menu) => (
          //         <>
          //           {menu}
          //           <Divider style={{ margin: "8px 0" }} />
          //           <Space style={{ padding: "0 8px 4px" }}>
          //             <Input
          //               placeholder="Please enter item"
          //               value={name}
          //               onChange={onNameChange}
          //             />
          //             <Button
          //               type="text"
          //               icon={<PlusOutlined />}
          //               onClick={addItem}
          //             >
          //               Add item
          //             </Button>
          //           </Space>
          //         </>
          //       )}
          //       options={items.map((item) => ({ label: item, value: item }))}
          //     />
          //   );
          case Property.TIME:
            return (
              <TimePicker ref={inputRef as any} onChange={save} onBlur={save} />
            );
        }
      })()}
    </Form.Item>
  ) : (
    <>
      {property === Property.CHECKBOX ? (
        <Checkbox ref={inputRef as any} />
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={toggleEdit}
        >
          {handleRender(render)}
        </div>
      )}
    </>
  );

  const items: MenuProps["items"] = [
    {
      label: "Delete",
      key: "3",
      onClick: () => handleDeleteRow(record.key),
      icon: <DeleteOutlined />,
    },
  ];

  return (
    <td {...restProps}>
      <Dropdown menu={{ items }} trigger={["contextMenu"]}>
        <div style={{ padding: "16px" }}>{childNode}</div>
      </Dropdown>
    </td>
  );
};
