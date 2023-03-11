import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import blocksSlice from "./slices/blocksSlice";

const store = configureStore({
  reducer: {
    blocksReducer: blocksSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
