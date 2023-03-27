import { createSlice } from "@reduxjs/toolkit";
import { Node } from "../../boot/FileSystem";

const initialState: Node = {
  title: "test",
  key: "0",
};

const fileSystemSlice = createSlice({
  name: "fileSystemSlice",
  initialState: {
    fileSystem: initialState,
  },
  reducers: {
    updateFileSystem(state, action) {
      const { tree } = action.payload;
      state.fileSystem = tree;
    },
  },
});

export const { updateFileSystem } = fileSystemSlice.actions;

export default fileSystemSlice.reducer;
