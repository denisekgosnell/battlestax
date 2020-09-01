import constants from "./constants";

const initialState = {
  initialized: false,
  gameId: 0,
  currentGame: {
    currentState: "",
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
    case constants.APP_INITIALIZED:
      // flips the initialized state for the app
      return {
        ...state,
        initialized: !state.initialized,
      };
      
    case constants.INIT_GAME:
      // start a new game
      // game's current state should be "ADDING PLAYERS"
      return {
        ...state,
        currentGame: {
          currentState: constants.ADDING_PLAYERS,
        },
      };

    case constants.ADD_PLAYER:
      // adds a new player to the players list
      if (state.currentGame.players.length === constants.MAXIMUM_PLAYERS)
        // TODO: ADDING THE PLAYER WHO TRIGGERS THIS LOGIC TO THE AUDIENCE
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
      // game's current state should be "TUTORIAL ROUND"
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          currentRound: constants.TUTORIAL_ROUND,
        },
      };

    case constants.ROUND_ONE:
      // flips the initialized state for the game payload
      // game's current state should be "TUTORIAL ROUND"
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          currentRound: constants.ROUND_ONE,
        },
      };

    case constants.ADD_AUDIENCE:
      // incriments the audience state value
      return {
        ...state,
        audienceSize: state.audienceSize++
      };
    default:
      return state;
  }
}
