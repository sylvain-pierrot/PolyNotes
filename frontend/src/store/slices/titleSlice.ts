import { createSlice } from "@reduxjs/toolkit";

const initialState: string | null = null;

const titleSlice = createSlice({
  name: "titleSlice",
  initialState: {
    title: initialState,
  },
  reducers: {
    updateContent(state, action) {
      const { content } = action.payload;
      state.title = content;
    },
  },
});

export const { updateContent } = titleSlice.actions;

export default titleSlice.reducer;
