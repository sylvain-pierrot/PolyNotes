import { Button, Dropdown } from "antd";
import { useCallback, useEffect, useState } from "react";
import TableView from "./views/TableView/TableView";
import { EllipsisOutlined } from "@ant-design/icons";
import "./BaseDatabase.css";
import KanbanView from "./views/KanbanView/KanbanView";
import {
  Column,
  Container,
  DataType,
  getContainerIndexAndItemIndex,
  getDefaultColumnValue,
} from "../../../../utils/utils";
import { useDispatch } from "react-redux";
import { updateContentBlockById } from "../../../../store/slices/pageSlice";

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

interface IPropsDataBase {
  id: string;
  content: any | null;
}

const BaseDatabase: React.FC<IPropsDataBase> = ({ id, content }) => {
  // Declare and initialize state variables
  const [rows, setRows] = useState<DataType[]>(
    JSON.parse(JSON.stringify(content.rows))
  );
  const [columns, setColumns] = useState<Column[]>(
    JSON.parse(JSON.stringify(content.columns))
  );
  const [containers, setContainers] = useState<Container[]>(
    JSON.parse(JSON.stringify(content.containers))
  );
  const [viewSelected, setViewSelected] = useState(views[0]);

  // Dispatch
  const dispatch = useDispatch();

  // Update the containers state whenever the rows or columns state changes
  useEffect(() => {
    setContainers((prevContainers) => {
      let newContainers = [...prevContainers];
      rows.forEach((row) => {
        const e = getContainerIndexAndItemIndex(prevContainers, row);

        if (e !== null) {
          newContainers[e.indexC].items[e.indexI] = row;
        } else {
          newContainers[0].items.push(row);
        }
      });
      return newContainers;
    });
  }, [rows, columns]);

  useEffect(() => {
    const newContent = {
      rows: rows,
      columns: columns,
      containers: containers,
    };

    dispatch(updateContentBlockById({ id: id, content: newContent }));
  }, [rows, columns, containers, dispatch, id]);

  // Add a new column to the table
  const newColumn = useCallback((column: Column) => {
    setColumns((prevColumns) => [...prevColumns, column]);
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        [column.name]: getDefaultColumnValue(column.property),
      }))
    );
  }, []);

  // Add a new container to the kanban view
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
