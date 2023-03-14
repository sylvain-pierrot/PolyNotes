import { Button, Dropdown, Table } from "antd";
import { useState } from "react";
import TableView from "./views/TableView/TableView";
import { EllipsisOutlined } from "@ant-design/icons";
import "./BaseDatabase.css";

export interface DataType {
  key: React.Key;
  [key: string]: any;
}

type EditableTableProps = Parameters<typeof Table>[0];
export type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const BaseDatabase: React.FC = () => {
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

  // States
  const [viewSelected, setViewSelected] = useState(views[0]);

  const [rows, setRows] = useState<DataType[]>([
    {
      key: "0",
      name: "Edward King 0",
    },
    {
      key: "1",
      name: "Edward King 1",
    },
  ]);

  const [columns, setColumns] = useState<string[]>(["name", "age", "address"]);

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

      <TableView rows={rows} columns={columns} />
    </>
  );
};

export default BaseDatabase;
