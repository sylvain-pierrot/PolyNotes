import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export enum BlockType {
  BASIC = "text",
  IMAGE = "img",
  TABLE = "table",
}

export interface Block {
  id: string;
  content: string | null;
  type: BlockType;
}

const initialState: Block[] = [
  { id: uuidv4(), content: null, type: BlockType.TABLE },
];

const blocksSlice = createSlice({
  name: "blocksSlice",
  initialState: {
    blocks: initialState,
  },
  reducers: {
    newBlock(state, action) {
      const { id, content } = action.payload;
      let index = 0;
      if (id) {
        index = state.blocks.findIndex((block) => block.id === id) + 1;
      }
      const newBlock: Block = {
        id: uuidv4(),
        content: content ? content : null,
        type: BlockType.BASIC,
      };
      state.blocks.splice(index, 0, newBlock);
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
    updateContent(state, action) {
      const { id, content } = action.payload;
      const index = state.blocks.findIndex((block) => block.id === id);
      if (index !== -1) {
        state.blocks[index].content = content;
      }
      console.log(JSON.parse(JSON.stringify(state.blocks)));
    },
  },
});

export const { newBlock, destroyBlock, changeToImageBlock, updateContent } =
  blocksSlice.actions;

export default blocksSlice.reducer;
