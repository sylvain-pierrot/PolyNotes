import { Card } from "antd";
import { DataType } from "../../BaseDatabase";

interface IPropsItem {
  item: DataType;
}

const Item: React.FC<IPropsItem> = ({ item }) => {
  const style = {
    margin: 10,
  };

  return (
    <Card style={style}>
      {Object.keys(item).map((key) => {
        return <p key={key}>{`${key} : ${item[key].toString()}`}</p>;
      })}
    </Card>
  );
};

export default Item;
