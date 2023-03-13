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
    newBlock(state, action) {
      const { id, content } = action.payload;
      const index = state.blocks.findIndex((block) => block.id === id);
      const newBlock: Block = {
        id: uuidv4(),
        content: content,
        type: BlockType.BASIC,
      };
      state.blocks.splice(index + 1, 0, newBlock);
    },
    destroyBlock(state, action) {
      const { id } = action.payload;

      state.blocks = state.blocks.filter((block) => block.id !== id);
    },
    changeToImageBlock(state, action) {
      const { id } = action.payload;

      const index = state.blocks.findIndex((block) => block.id === id);

      state.blocks[index].type = BlockType.IMAGE;
    },
  },
});

export const { newBlock, destroyBlock, changeToImageBlock } =
  blocksSlice.actions;

export default blocksSlice.reducer;
