export const initialState = {
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
              }
            ]
          }
        ]
      }
    ]
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INIT_GAME':
      // flips the initialized state for the game payload
      return {
        ...state,
        initialized: !state.initialized,
       };
    case 'ADD_PLAYER':
      // adds a new player to the players list
      return {
        ...state,
        players: [...state.players,
                  {"name": action.name,
                   "vip": false,
                   "totalScore": 0
                   }
                 ]
       };
    case 'START_TUTORIAL':
          // flips the initialized state for the game payload
          return {
            ...state,
            ...state.currentGame.currentRound: "Tutorial",
           };
    default:
      return state;
  }
}