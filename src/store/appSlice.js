import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  initialized: true,
};

export const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleInitialized: (state) => {
      state.initialized = !state.initialized;
    },
  },
});

export const { toggleInitialized } = slice.actions;

export const selectInitialized = (state) => state.app.initialized;

export default slice.reducer;
