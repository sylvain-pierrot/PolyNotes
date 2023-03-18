import { Button, Dropdown } from "antd";
import { useEffect, useState } from "react";
import TableView from "./views/TableView/TableView";
import { EllipsisOutlined } from "@ant-design/icons";
import "./BaseDatabase.css";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import KanbanView from "./views/KanbanView/KanbanView";

export enum Property {
  NUMBER = "number",
  SINGLE_SELECT = "single-select",
  DATE = "date",
  TIME = "time",
  TEXT = "text",
  CHECKBOX = "checkbox",
}

export function getDefaultColumnValue(property: Property): any {
  switch (property) {
    case Property.NUMBER:
      return 0;
    case Property.SINGLE_SELECT:
      return null;
    case Property.DATE:
      return dayjs("01/01/2023", "DD/MM/YYYY");
    case Property.TIME:
      return dayjs("00:00:00", "HH:mm:ss");
    case Property.TEXT:
      return "";
    case Property.CHECKBOX:
      return false;
    default:
      throw new Error(`Unknown column type: ${property}`);
  }
}

// Views selectable
const views = [
  {
    key: "1",
    label: "Table",
  },
  {
    key: "2",
    label: "Kanban",
  },
];

export interface DataType {
  key: React.Key;
  [key: string]: any;
}

const BaseDatabase: React.FC = () => {
  // Rows
  const [rows, setRows] = useState<DataType[]>([
    {
      key: uuidv4(),
      name: "Edward King 0",
      bool: true,
      number: 1,
      time: dayjs("00:00:00", "HH:mm:ss"),
    },
    {
      key: uuidv4(),
      name: "Edward King 1",
      bool: false,
      number: 1,
      time: dayjs("00:00:00", "HH:mm:ss"),
    },
  ]);

  // Columns
  const [columns, setColumns] = useState<
    { name: string; property: Property }[]
  >([
    { name: "name", property: Property.TEXT },
    { name: "bool", property: Property.CHECKBOX },
    { name: "number", property: Property.NUMBER },
    { name: "time", property: Property.TIME },
  ]);

  // States
  const [viewSelected, setViewSelected] = useState(views[0]);

  // useEffect
  useEffect(() => {
    console.log(rows);
  }, [rows, columns]);

  // Handles
  const newColumn = (column: { name: string; property: Property }) => {
    setColumns([...columns, column]);
    const newRows = rows;
    newRows.forEach((row) => {
      row[column.name] = getDefaultColumnValue(column.property);
    });
    setRows(newRows);
  };

  return (
    <>
      <div className="menu-database">
        <Button type="ghost">{viewSelected.label}</Button>
        <Dropdown
          menu={{
            items: views,
            selectable: true,
            defaultSelectedKeys: [viewSelected.key],
            onSelect: ({ key }) => {
              const index = views.findIndex((view) => view.key === key);
              setViewSelected(views[index]);
            },
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      </div>
      {viewSelected.key === "1" && (
        <TableView
          rows={rows}
          columns={columns}
          newColumn={newColumn}
          updateRows={setRows}
          updateCols={setColumns}
        />
      )}
      {viewSelected.key === "2" && <KanbanView items={rows} />}
    </>
  );
};

export default BaseDatabase;
