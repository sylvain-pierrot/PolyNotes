import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./slices/authSlice";
import blocksSlice from "./slices/blocksSlice";
import fileSystemSlice from "./slices/fileSystemSlice";
import titleSlice from "./slices/titleSlice";

const store = configureStore({
  reducer: {
    blocksReducer: blocksSlice,
    titleReducer: titleSlice,
    authReducer: authSlice,
    fileSystemReducer: fileSystemSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
