import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./slices/authSlice";
import fileSystemSlice from "./slices/fileSystemSlice";
import pageSlice from "./slices/pageSlice";

const store = configureStore({
  reducer: {
    pageReducer: pageSlice,
    authReducer: authSlice,
    fileSystemReducer: fileSystemSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
