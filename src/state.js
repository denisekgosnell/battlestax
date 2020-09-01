import constants from "./constants";

const initialState = {
  initialized: false,
  gameId: 0,
  currentGame: {
    currentRound: 0,
    currentQuestion: 0,
    audienceSize: 0,
    players: [],
    rounds: [
      {
        id: 1,
        type: "",
        title: "Round One",
        scoreMultiplier: 1,
        questions: [
          {
            type: "",
            content: "",
            answers: [
              {
                name: "",
                answer: "",
                votes: [
                  {
                    name: "",
                  },
                ],
                audienceVotes: 0,
                score: 0,
              },
            ],
          },
        ],
      },
    ],
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.INIT_GAME:
      // flips the initialized state for the game payload
      return {
        ...state,
        initialized: !state.initialized,
      };
    case constants.ADD_PLAYER:
      // adds a new player to the players list
      if (state.currentGame.players.length === constants.MAXIMUM_PLAYERS)
        return { ...state, audienceSize: state.audienceSize++ };
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          players: [
            ...state.currentGame.players,
            {
              name: action.name,
              vip: !state.currentGame.players.length,
              totalScore: 0,
            },
          ],
        },
      };
    case constants.START_TUTORIAL:
      // flips the initialized state for the game payload
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          currentRound: constants.TUTORIAL_ROUND,
        },
      };
    default:
      return state;
  }
}
