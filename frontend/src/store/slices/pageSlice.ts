import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Page {
  author: string;
  title: string | null;
  blocks: Block[];
}

export enum BlockType {
  BASIC = "text",
  IMAGE = "img",
  TABLE = "table",
  BULLET_LIST = "bullet-list",
  ORDERED_LIST = "ordered-list",
}

export interface Block {
  id: string;
  content: string | null;
  type: BlockType;
}

const initialState: Page = { author: "string", title: null, blocks: [] };

const pageSlice = createSlice({
  name: "pageSlice",
  initialState: {
    page: initialState,
  },
  reducers: {
    newBlock(state, action) {
      const { id, content } = action.payload;
      let index = 0;
      if (id) {
        index = state.page.blocks.findIndex((block) => block.id === id) + 1;
      }
      const newBlock: Block = {
        id: uuidv4(),
        content: content ? content : null,
        type: BlockType.BASIC,
      };
      state.page.blocks.splice(index, 0, newBlock);
    },
    destroyBlock(state, action) {
      const { id } = action.payload;
      state.page.blocks = state.page.blocks.filter((block) => block.id !== id);
    },
    changeToTypeBlock(state, action) {
      const { id, type } = action.payload;
      const index = state.page.blocks.findIndex((block) => block.id === id);
      state.page.blocks[index].type = type;
    },
    updateContentBlockById(state, action) {
      const { id, content } = action.payload;
      const index = state.page.blocks.findIndex((block) => block.id === id);
      if (index !== -1) {
        state.page.blocks[index].content = content;
      }
      console.log(JSON.parse(JSON.stringify(state.page.blocks)));
    },
    updateTitle(state, action) {
      const { content } = action.payload;
      state.page.title = content;
    },
  },
});

export const {
  newBlock,
  destroyBlock,
  changeToTypeBlock,
  updateContentBlockById,
  updateTitle,
} = pageSlice.actions;

export default pageSlice.reducer;
