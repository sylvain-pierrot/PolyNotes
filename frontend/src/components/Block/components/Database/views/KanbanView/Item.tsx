import { UniqueIdentifier } from "@dnd-kit/core";

interface IPropsItem {
  id: UniqueIdentifier;
}

const Item: React.FC<IPropsItem> = ({ id }) => {
  const style = {
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid black",
    margin: "10px 0",
    background: "white",
  };

  return <div style={style}>{id}</div>;
};

export default Item;
