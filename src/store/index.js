import { configureStore, combineReducers } from "@reduxjs/toolkit";
import persistState from "redux-localstorage";
import appReducer from "./appSlice";
import gameReducer from "./gameSlice";
import playersReducer from "./playersSlice";
import questionsReducer from "./questionsSlice";
import answersReducer from "./answersSlice";

export const reducers = combineReducers({
  app: appReducer,
  game: gameReducer,
  players: playersReducer,
  questions: questionsReducer,
  answers: answersReducer,
});

export default configureStore({
  reducer: reducers,
  enhancers: [persistState()],
});
