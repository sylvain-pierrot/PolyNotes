import { MenuProps } from "antd";
import dayjs from "dayjs";

export type MenuItem = Required<MenuProps>["items"][number];

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

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

export type Column = {
  name: string;
  property: Property;
};

export type Container = {
  id: string;
  title: string;
  items: DataType[];
};

export interface DataType {
  key: React.Key;
  [key: string]: any;
}

export const getContainerIndexAndItemIndex = (
  containers: Container[],
  row: DataType
): { indexC: number; indexI: number } | null => {
  for (const i in containers) {
    for (const j in containers[i].items) {
      if (row.key === containers[i].items[j].key) {
        return { indexC: parseInt(i), indexI: parseInt(j) };
      }
    }
  }
  return null;
};
