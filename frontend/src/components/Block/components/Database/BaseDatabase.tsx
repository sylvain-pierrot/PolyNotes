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
// react:
// rows are represent by items in containers. In the useEffect, on data rows change , please update items in containers, if the "row" as "item" in containers doesn't exist create and put him in the default container

// export interface DataType {

//   key: React.Key;
//   [key: string]: any;
// }

// const [rows, setRows] = useState<DataType[]>([]);

// const [containers, setContainers] = useState<
//     {
//       id: string;
//       title: string;
//       items: DataType[];
//     }[]
//   >([{ id: uuidv4(), title: "Default", items: rows }]);

//  useEffect(() => {}, [rows, containers]);

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
  const [rows, setRows] = useState<DataType[]>([]);

  // Columns
  const [columns, setColumns] = useState<
    { name: string; property: Property }[]
  >([{ name: "name", property: Property.TEXT }]);

  // Containers
  const [containers, setContainers] = useState<
    {
      id: string;
      title: string;
      items: DataType[];
    }[]
  >([{ id: uuidv4(), title: "Default", items: rows }]);

  // States
  const [viewSelected, setViewSelected] = useState(views[0]);

  // useEffect
  useEffect(() => {
    let newContainers = containers;
    for (const row of rows) {
      const e = getContainerIndexAndItemIndex(row);
      if (e !== -1) {
        newContainers[e.indexC].items[e.indexI] = row;
      } else {
        newContainers[0].items.push(row);
      }
    }
    setContainers(newContainers);
  }, [rows, containers]);

  // Handles
  const newColumn = (column: { name: string; property: Property }) => {
    setColumns([...columns, column]);
    const newRows = rows;
    newRows.forEach((row) => {
      row[column.name] = getDefaultColumnValue(column.property);
    });
    setRows(newRows);
  };
  const newContainer = (container: {
    id: string;
    title: string;
    items: DataType[];
  }) => {
    setContainers([...containers, container]);
  };
  const getContainerIndexAndItemIndex = (row: DataType) => {
    for (const i in containers) {
      for (const j in containers[i].items) {
        if (row.key === containers[i].items[j].key) {
          return { indexC: parseInt(i), indexI: parseInt(j) };
        }
      }
    }
    return -1;
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
      {viewSelected.key === "2" && (
        <KanbanView
          containers={containers}
          setContainers={setContainers}
          newContainer={newContainer}
        />
      )}
    </>
  );
};

export default BaseDatabase;
