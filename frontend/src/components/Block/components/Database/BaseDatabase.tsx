import { Button, Dropdown } from "antd";
import { useEffect, useState } from "react";
import TableView from "./views/TableView/TableView";
import { EllipsisOutlined } from "@ant-design/icons";
import "./BaseDatabase.css";
import { v4 as uuidv4 } from "uuid";
import KanbanView from "./views/KanbanView/KanbanView";
import { Column, Container, DataType, getContainerIndexAndItemIndex, getDefaultColumnValue, Property } from "../../../../utils/utils";

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

const BaseDatabase: React.FC = () => {
  const [rows, setRows] = useState<DataType[]>([]);
  const [columns, setColumns] = useState<Column[]>([
    { name: "name", property: Property.TEXT },
  ]);
  const [containers, setContainers] = useState<Container[]>([
    { id: uuidv4(), title: "Default", items: rows },
  ]);
  const [viewSelected, setViewSelected] = useState(views[0]);

  useEffect(() => {
    let newContainers = [...containers];
    rows.forEach((row) => {
      const e = getContainerIndexAndItemIndex(containers, row);
      if (e !== null) {
        newContainers[e.indexC].items[e.indexI] = row;
      } else {
        newContainers[0].items.push(row);
      }
    });
    setContainers(newContainers);
  }, [rows, containers]);

  const newColumn = (column: Column) => {
    const newColumns = [...columns, column];
    const newRows = rows.map((row) => ({
      ...row,
      [column.name]: getDefaultColumnValue(column.property),
    }));
    setColumns(newColumns);
    setRows(newRows);
  };

  const newContainer = (container: Container) => {
    setContainers([...containers, container]);
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
