import { createSlice } from "@reduxjs/toolkit";
import constants from "../constants";

export const initialState = {
  id: "",
  audienceSize: 0,
  page: "",
  player: "",
};

export const slice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initialize: (state, action) => {
      state.id = action.payload;
      state.page = constants.ADDING_PLAYERS;
    },
    setPlayer: (state, action) => {
      state.player = action.payload;
    },
    incrementAudienceSize: (state) => {
      state.audienceSize += 1;
    },
  },
});

export const { initialize, setPlayer, incrementAudienceSize } = slice.actions;

export const selectId = (state) => state.game.id;
export const selectPage = (state) => state.game.page;
export const selectAudienceSize = (state) => state.game.audienceSize;
export const selectPlayer = (state) => state.game.player;

export default slice.reducer;
