import React, { useState } from "react";
import { Button, Col, FormInstance, Row, Table } from "antd";
import { Property, DataType, getDefaultColumnValue } from "../../BaseDatabase";
import "./TableView.css";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import SiderForm from "./SiderForm";
import { v4 as uuidv4 } from "uuid";
import { ColumnType } from "antd/es/table";
import EditableCell from "./EditableCell";
import EditableRow from "./EditableTable";

export const EditableContext = React.createContext<FormInstance<any> | null>(
  null
);

type EditableTableProps = Parameters<typeof Table>[0];
export type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

interface IPropsTableView {
  rows: DataType[];
  columns: { name: string; property: Property }[];
  newColumn: (column: { name: string; property: Property }) => void;
  updateRows: (rows: DataType[]) => void;
  updateCols: (cols: { name: string; property: Property }[]) => void;
}

const TableView: React.FC<IPropsTableView> = ({
  rows,
  columns,
  newColumn,
  updateRows,
  updateCols,
}) => {
  // States
  const [showSider, setShowSider] = useState(false);

  // tableViewColumns
  const tableViewColumns = columns.map((col) => {
    const tableViewColumn: ColumnType<DataType> = {
      title: () => {
        return (
          <Row
            justify={"space-between"}
            align={"middle"}
            className="header-cell"
          >
            {col.name}
            <Button
              type="text"
              shape={"circle"}
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteCol(col.name)}
            />
          </Row>
        );
      },
      dataIndex: col.name,
    };

    return {
      ...tableViewColumn,
      onCell: (record: DataType) => ({
        record,
        editable: true,
        dataIndex: tableViewColumn.dataIndex,
        title: tableViewColumn.title,
        property: col.property,
        render: record[tableViewColumn.dataIndex as string],
        handleDeleteRow,
        handleSave,
      }),
    };
  }) as ColumnTypes;

  // Handles
  const handleDeleteCol = (dataIndex: React.Key) => {
    const newCols = columns.filter((col) => col.name !== dataIndex);
    const newRows = rows;
    newRows.forEach((row) => delete row[dataIndex]);
    updateRows(newRows);
    updateCols(newCols);
  };
  const handleDeleteRow = (key: React.Key) => {
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
          rowClassName={() => "editable-row"}
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
