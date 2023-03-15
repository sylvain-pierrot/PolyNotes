import React, { useState } from "react";
import { Button, Col, Popconfirm, Row, Table } from "antd";
import { Property, DataType, getDefaultColumnValue } from "../../BaseDatabase";
import "./TableView.css";
import { PlusOutlined } from "@ant-design/icons";
import SiderForm from "./SiderForm";
import { EditableCell, EditableRow } from "./EditableTable";
import { v4 as uuidv4 } from "uuid";

type EditableTableProps = Parameters<typeof Table>[0];
export type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

interface IPropsTableView {
  rows: DataType[];
  columns: { name: string; property: Property }[];
  newColumn: (column: { name: string; property: Property }) => void;
  updateRows: (rows: DataType[]) => void;
}

const TableView: React.FC<IPropsTableView> = ({
  rows,
  columns,
  newColumn,
  updateRows,
}) => {
  // States
  const [showSider, setShowSider] = useState(false);

  // tableViewColumns
  const tableViewColumns = columns.map((col) => {
    const tableViewColumn: ColumnTypes[number] & {
      editable?: boolean;
      dataIndex: string;
    } = {
      title: col.name,
      dataIndex: col.name,
      editable: true,
    };

    return {
      ...tableViewColumn,
      onCell: (record: DataType) => ({
        record,
        editable: tableViewColumn.editable,
        dataIndex: tableViewColumn.dataIndex,
        title: tableViewColumn.title,
        property: col.property,
        render: record[tableViewColumn.dataIndex],
        handleDelete,
        handleSave,
      }),
    };
  }) as ColumnTypes;

  // Handles
  const handleDelete = (key: React.Key) => {
    const newRows = rows.filter((row) => row.key !== key);
    updateRows(newRows);
  };

  const handleAdd = () => {
    const newRow: DataType = {
      key: uuidv4(),
    };
    columns.forEach((col) => {
      newRow[col.name] = getDefaultColumnValue(col.property);
    });
    updateRows([...rows, newRow]);
  };

  const handleSave = (row: DataType) => {
    const newData = [...rows];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    updateRows(newData);
  };

  return (
    <Row style={{ position: "relative" }}>
      <Col span={23}>
        <Table
          components={{
            body: {
              row: EditableRow,
              cell: EditableCell,
            },
          }}
          rowClassName={"editable-row"}
          bordered
          dataSource={rows}
          columns={tableViewColumns}
          pagination={false}
          className="table"
        />
        <Button
          type="text"
          icon={<PlusOutlined />}
          size={"large"}
          className="btn-new-row"
          onClick={handleAdd}
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
          onClick={() => setShowSider(true)}
        />
        {showSider && (
          <SiderForm
            newColumn={newColumn}
            closeSider={() => setShowSider(false)}
          />
        )}
      </Col>
    </Row>
  );
};

export default TableView;
