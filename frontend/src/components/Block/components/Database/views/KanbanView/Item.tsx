import { Card } from "antd";
import { DataType } from "../../BaseDatabase";

interface IPropsItem {
  item: DataType;
}

const Item: React.FC<IPropsItem> = ({ item }) => {
  const style = {
    width: "100%",
    margin: "10px 0",
  };

  return (
    <Card style={style}>
      {Object.keys(item).map((key) => {
        return <p>{`${key} : ${item[key].toString()}`}</p>;
      })}
    </Card>
  );
};

export default Item;
