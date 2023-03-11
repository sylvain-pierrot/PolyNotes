import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export enum BlockType {
  BASIC = "text",
  IMAGE = "img",
}

export interface Block {
  id: string;
  content: string;
  type: BlockType;
}

const initialState: Block[] = [
  { id: uuidv4(), content: "", type: BlockType.BASIC },
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
        type: BlockType.BASIC,
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
