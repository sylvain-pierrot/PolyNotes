import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select, Table } from "antd";
import EditableRow from "./EditableRow";
import EditableCell from "./EditableCell";
import { ColumnTypes, DataType } from "../../BaseDatabase";
import "./TableView.css";
import { PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import { Option } from "antd/es/mentions";

interface IPropsTableView {
  rows: DataType[];
  columns: string[];
}

const TableView: React.FC<IPropsTableView> = ({ rows, columns }) => {
  // const [columns, setColumns] = useState<
  //   (ColumnTypes[number] & {
  //     editable?: boolean;
  //     dataIndex: string;
  //   })[]
  // >([
  //   {
  //     title: "name",
  //     dataIndex: "name",
  //     // width: "30%",
  //     editable: true,
  //   },
  //   // {
  //   //   title: "operation",
  //   //   dataIndex: "operation",
  //   //   //   render: (_, record: { key: React.Key }) =>
  //   //   //     dataSource.length >= 1 ? (
  //   //   //       <Popconfirm
  //   //   //         title="Sure to delete?"
  //   //   //         onConfirm={() => handleDelete(record.key)}
  //   //   //       >
  //   //   //         <a>Delete</a>
  //   //   //       </Popconfirm>
  //   //   //     ) : null,
  //   // },
  // ]);

  const tableColumns = columns.map((col) => {
    const colTable: ColumnTypes[number] & {
      editable?: boolean;
      dataIndex: string;
    } = {
      title: col,
      dataIndex: col,
      editable: true,
    };

    return {
      ...colTable,
      onCell: (record: DataType) => ({
        record,
        editable: colTable.editable,
        dataIndex: colTable.dataIndex,
        title: colTable.title,
        // handleSave,
      }),
    };
  }) as ColumnTypes;

  //   const [count, setCount] = useState(2);

  //   const handleDelete = (key: React.Key) => {
  //     const newData = dataSource.filter((item) => item.key !== key);
  //     setDataSource(newData);
  //   };

  // const handleAdd = () => {
  //   const newData: DataType = {
  //     key: count,
  //     name: `Edward King ${count}`,
  //     age: "32",
  //     address: `London, Park Lane no. ${count}`,
  //   };
  //   setDataSource([...dataSource, newData]);
  //   setCount(count + 1);
  // };

  //   const handleSave = (row: DataType) => {
  //     const newData = [...dataSource];
  //     const index = newData.findIndex((item) => row.key === item.key);
  //     const item = newData[index];
  //     newData.splice(index, 1, {
  //       ...item,
  //       ...row,
  //     });
  //     setDataSource(newData);
  //   };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const [form] = Form.useForm<{ name: string; type: number }>();
  const [show, setShow] = useState(false);

  return (
    <Row style={{ position: "relative" }}>
      <Col span={23}>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={rows}
          columns={tableColumns}
          pagination={false}
          className="table"
        />
        <Button
          type="text"
          icon={<PlusOutlined />}
          size={"large"}
          className="btn-new-row"
        >
          New
        </Button>
      </Col>
      <Col span={1}>
        <Button
          type="text"
          icon={<PlusOutlined />}
          size={"large"}
          className="btn-new-col"
          onClick={() => setShow(true)}
        />
        {show && (
          <Sider className="sider-new-col" theme="light">
            <Row
              align={"middle"}
              justify={"space-between"}
              style={{ padding: "0 8px" }}
            >
              <p>New column</p>
              <Button
                type="text"
                shape="circle"
                icon={<CloseCircleOutlined />}
                size={"small"}
                onClick={() => setShow(false)}
              />
            </Row>
            <Row justify={"center"}>
              <Col span={20}>
                <Form form={form} layout="vertical" autoComplete="off">
                  <Form.Item name="name">
                    <Input placeholder="Colomn name" />
                  </Form.Item>
                  <Form.Item name="type">
                    <Select
                      placeholder={"Type value"}
                      style={{ width: "100%" }}
                      options={[
                        { value: "jack", label: "Rich/plain Text" },
                        { value: "lucy", label: "Checkbox" },
                        { value: "Yiminghe", label: "Date & Time" },
                        { value: "Yiminghe", label: "Single Select" },
                        { value: "Yiminghe", label: "Number" },
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
        )}
      </Col>
    </Row>
  );
};

export default TableView;
