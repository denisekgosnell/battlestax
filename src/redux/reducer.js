export const initialState = {
  initialized: false,
  gameId: 0,
  currentGame: {
    currentRound: 0,
    currentQuestion: 0,
    audienceSize: 0,
    players: [
      {
        name: "",
        vip: true,
        totalScore: 0,
      },
    ],
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
      // Changes the requesting field in state to true to show we are currently fetching to-dos
      return Object.assign({}, state,
        {
          initialized: true,
        },
      );
    default:
      return state;
  }
}