import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

enum BlockType {
  PARAGRAPH = "p",
  HEADING_1 = "h1",
  HEADING_2 = "h2",
  HEADING_3 = "h3",
  IMAGE = "img",
}

export interface Block {
  id: string;
  content: string;
  type: BlockType;
}

const initialState: Block[] = [
  { id: uuidv4(), content: "", type: BlockType.PARAGRAPH },
];

const blocksSlice = createSlice({
  name: "blocksSlice",
  initialState: {
    blocks: initialState,
  },
  reducers: {
    newBlock(state) {
      const newBlock: Block = {
        id: uuidv4(),
        content: "",
        type: BlockType.PARAGRAPH,
      };
      state.blocks.push(newBlock);
    },
    destroyBlock(state, action) {
      const { id } = action.payload;

      state.blocks = state.blocks.filter((block) => block.id !== id);
    },
  },
});

export const { newBlock, destroyBlock } = blocksSlice.actions;

export default blocksSlice.reducer;
