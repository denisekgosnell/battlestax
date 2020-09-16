import { store } from "./state";

export const createGame = async (gameId) => {
  const res = await fetch(
    `http://localhost:8888/.netlify/functions/insertGame/${gameId}`,
    {
      method: "POST",
      body: JSON.stringify({ ...store.getState(), gameId }),
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
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  return await res.json();
};
