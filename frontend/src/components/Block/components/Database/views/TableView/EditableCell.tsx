import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Input,
  InputNumber,
  InputRef,
  MenuProps,
  Select,
  Space,
  TimePicker,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { EditableContext } from "./TableView";
import { DataType, Property } from "../../../../../../utils/utils";

dayjs.extend(customParseFormat);

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

const EditableCell: React.FC<EditableCellProps> = ({
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
  // Hooks
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;
  const [formSingleSelect] = Form.useForm<{ name: string }>();

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
    switch (property) {
      case Property.TIME:
        return dayjs(render as Dayjs).format("HH:mm:ss");
      case Property.DATE:
        return dayjs(render as Dayjs).format("DD/MM/YYYY");
      default:
        return render;
    }
  };

  const [selectItems, setSelectItems] = useState(["jack", "lucy"]);

  const addItem = (value: { name: string }) => {
    setSelectItems([...selectItems, value.name]);
    formSingleSelect.resetFields();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

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
          case Property.DATE:
            return (
              <DatePicker
                ref={inputRef as any}
                onChange={save}
                onBlur={save}
                format={"DD/MM/YYYY"}
              />
            );
          case Property.SINGLE_SELECT:
            return (
              <Select
                ref={inputRef as any}
                onChange={save}
                placeholder="custom dropdown render"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space style={{ padding: "0 8px 4px" }}>
                      <Form
                        form={formSingleSelect}
                        autoComplete="off"
                        layout={"inline"}
                        onFinish={addItem}
                        style={{ flexWrap: "nowrap" }}
                      >
                        <Form.Item
                          style={{ width: "7em" }}
                          name="name"
                          rules={[
                            {
                              required: true,
                              validator(rule, value, callback) {
                                if (!selectItems.includes(value)) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error("Name already exists!")
                                );
                              },
                            },
                          ]}
                        >
                          <Input placeholder="Name" />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="text"
                            icon={<PlusOutlined />}
                            htmlType="submit"
                            size={"small"}
                          >
                            Add item
                          </Button>
                        </Form.Item>
                      </Form>
                    </Space>
                  </>
                )}
                options={selectItems.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            );
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

  const itemsDropdown: MenuProps["items"] = [
    {
      label: "Delete",
      key: 0,
      onClick: () => handleDeleteRow(record.key),
      icon: <DeleteOutlined />,
    },
  ];

  return (
    <td {...restProps}>
      {dataIndex ? (
        <Dropdown menu={{ items: itemsDropdown }} trigger={["contextMenu"]}>
          <div style={{ padding: "16px" }}>{childNode}</div>
        </Dropdown>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
