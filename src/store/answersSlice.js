import { createSlice } from "@reduxjs/toolkit";

// id, question, player, content
export const initialState = {};

export const slice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    addAnswer: (state, action) => {
      state[action.payload.id] = action.payload;
    },
  },
});

export const { addAnswer } = slice.actions;

export const selectAnswers = (state) => state.answers;

export default slice.reducer;
