import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { updateAccessPageByid } from "../../boot/Pages";
import { Property } from "../../utils/utils";

export enum Access {
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum RoleAccess {
  Editor = "editor",
  Viewer = "viewer",
}

export interface PageProperties {
  author: string;
  title: string | null;
  blocks: Block[];
  owner: boolean;
  access: Access;
  roleAccess: RoleAccess | null;
}

export enum BlockType {
  TEXT = "text",
  IMAGE = "img",
  TABLE = "table",
  BULLET_LIST = "bullet-list",
  ORDERED_LIST = "ordered-list",
  TO_DO_LIST = "to-do-list",
  HEADING_1 = "heading-1",
  HEADING_2 = "heading-2",
  HEADING_3 = "heading-3",
  SUB_PAGE = "sub-page",
}

export interface Block {
  id: string;
  content: any | null;
  type: BlockType;
}

const initialState: PageProperties = {
  author: "default",
  title: "default",
  blocks: [],
  owner: false,
  access: Access.PRIVATE,
  roleAccess: null,
};

const pageSlice = createSlice({
  name: "pageSlice",
  initialState: {
    page: initialState,
  },
  reducers: {
    newBlock(state, action) {
      const { id, content } = action.payload;
      let index = 0;
      if (state.page) {
        if (id) {
          index = state.page.blocks.findIndex((block) => block.id === id) + 1;
        }
        const newBlock: Block = {
          id: uuidv4(),
          content: content ? content : null,
          type: BlockType.TEXT,
        };
        state.page.blocks.splice(index, 0, newBlock);
      }
    },
    destroyBlock(state, action) {
      const { id } = action.payload;
      state.page.blocks = state.page.blocks.filter((block) => block.id !== id);
    },
    changeToTypeBlock(state, action) {
      const { id, type } = action.payload;
      const index = state.page.blocks.findIndex((block) => block.id === id);
      state.page.blocks[index].type = type;
      if (type === BlockType.TABLE) {
        state.page.blocks[index].content = {
          rows: [],
          columns: [{ name: "name", property: Property.TEXT }],
          containers: [{ id: uuidv4(), title: "Default", items: [] }],
        };
      }
    },
    updateContentBlockById(state, action) {
      const { id, content } = action.payload;
      const index = state.page.blocks.findIndex((block) => block.id === id);
      if (index !== -1) {
        state.page.blocks[index].content = JSON.parse(JSON.stringify(content));
      }
    },
    updateTitle(state, action) {
      const { content } = action.payload;
      state.page.title = content;
    },
    updatePage(state, action) {
      const { page } = action.payload;
      state.page = page;
    },
    updatePageAccess(state, action) {
      const { pageId, access, roleAccess } = action.payload;
      state.page.access = access;
      state.page.roleAccess = roleAccess;
      updateAccessPageByid(pageId, access, roleAccess);
    },
  },
});

export const {
  newBlock,
  destroyBlock,
  changeToTypeBlock,
  updateContentBlockById,
  updateTitle,
  updatePage,
  updatePageAccess,
} = pageSlice.actions;

export default pageSlice.reducer;
