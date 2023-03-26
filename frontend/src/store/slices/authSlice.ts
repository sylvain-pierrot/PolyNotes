import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isAuthenticated: initialState,
  },
  reducers: {
    setIsAuthenticated(state, action) {
      const { isAuth } = action.payload;
      state.isAuthenticated = isAuth;
    },
  },
});

export const { setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;
