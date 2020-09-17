import { store } from "./state";
import _ from "lodash";

export const createGame = async (gameId) => {
  const filteredGame = _.omit(store.getState(), [
    "currentPlayerId",
    "initialized",
  ]);
  const res = await fetch(
    `http://localhost:8888/.netlify/functions/insertGame/${gameId}`,
    {
      method: "POST",
      body: JSON.stringify({ ...filteredGame, gameId }),
    }
  );
  return await res.json();
};

export const getGame = async (path) => {
  const res = await fetch(
    `http://localhost:8888/.netlify/functions/getGame/${path}`
  );
  return await res.json();
};

export const updateGame = async (path, data) => {
  const res = await fetch(
    `http://localhost:8888/.netlify/functions/updateGame/${path}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );
  return await res.json();
};

export const addPlayer = async (gameId, playerId) => {
  const res = await fetch(
    `http://localhost:8888/.netlify/functions/updateGame/${gameId}/players/${playerId}`,
    {
      method: "PUT",
      body: JSON.stringify({ name: playerId }),
    }
  );
  return await res.json();
};
