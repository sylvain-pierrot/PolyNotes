import { createSlice, current } from "@reduxjs/toolkit";
import { Node, patchFileSystem } from "../../boot/FileSystem";

const initialState: Node | null = null;

const getNode = (rootNode: Node, key: string): Node | undefined => {
  // If the node's key matches the search key, return the node
  if (rootNode.key === key) {
    return rootNode;
  }

  // If the node has children, recursively search them for the key
  if (rootNode.children) {
    for (let child of rootNode.children) {
      const childNode = getNode(child, key);
      if (childNode) {
        return childNode;
      }
    }
  }
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
    updateTitleNodeById(state, action) {
      const { newTitle, key } = action.payload;
      const node = getNode(state.fileSystem!, key);
      if (node) {
        node.title = newTitle;
      }

      if (state.fileSystem) {
        const nodeRoot = {
          nodeRoot: current(state.fileSystem),
        };

        // API
        patchFileSystem(nodeRoot);
      }
      return state;
    },
    createNode(state, action) {
      const { newNode, key } = action.payload;

      const parent = getNode(state.fileSystem!, key);

      if (parent) {
        parent.children = [...(parent.children || []), newNode];
      }

      if (state.fileSystem) {
        const nodeRoot = {
          nodeRoot: current(state.fileSystem),
        };

        // API
        patchFileSystem(nodeRoot);
      }

      return state;
    },
  },
});

export const { updateFileSystem, createNode, updateTitleNodeById } =
  fileSystemSlice.actions;

export default fileSystemSlice.reducer;
