import { createSlice } from "@reduxjs/toolkit";
import { incrementAudienceSize } from "./gameSlice";
import constants from "../constants";
import _ from "lodash";

// name, vip, score
export const initialState = {};

export const slice = createSlice({
  name: "players",
  initialState,
  reducers: {
    add: (state, action) => {
      state[action.payload.name] = action.payload;
    },
    incrementScore: (state, action) => {
      if (state[action.payload.name]) {
        state[action.payload.name].score += action.payload.score;
      }
    },
  },
});

export const addPlayer = (name) => {
  return (dispatch, getState) => {
    const { players } = getState();
    // don't allow for duplicate players
    if (players[name]) {
      return;
    }
    // don't allow more players than the maximum
    if (constants.MAXIMUM_PLAYERS <= _.keys(players).length) {
      return dispatch(incrementAudienceSize());
    }
    dispatch(
      slice.actions.add({
        name,
        score: 0,
        vip: _.keys(players).length === 0,
      })
    );
  };
};

export const { incrementScore } = slice.actions;

export const selectPlayers = (state) => state.players;

export default slice.reducer;
