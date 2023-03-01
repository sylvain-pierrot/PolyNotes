import "./Page.css";
import SortableBlocks from "../SortableBlocks/SortableBlocks";
import { createRange } from "../../utils/array";
import { useState } from "react";

function getMockItems() {
  return createRange(4, (index) => ({ id: index + 1 }));
}

const Page: React.FC = () => {
  const [blocks, setBlocks] = useState(getMockItems);

  return <SortableBlocks blocks={blocks} onChange={setBlocks} />;
};

export default Page;
