import constants from "./constants";
import _ from "lodash";

const initialState = {
  initialized: false,
  gameId: "",
  currentState: {}, // name, roundId
  players: {}, // plauyerId, name, totalScore; number of players == number of questions
  audienceSize: 0,
  rounds: {}, // roundId, type, title, score multiplier
  questions: {}, // questionId, roundId, content
  answers: {}, // answerId, questionId, playerId, content, score
  votes: {}, // voteId, answerId, playerId
  audienceVotes: {},
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
      // start a new game;
      // set the gameID from the action
      // game's current state is "ADDING PLAYERS"
      return {
        ...state,
        gameId: action.payload.gameId,
        currentState: {
          ...state.currentState,
          name: constants.ADDING_PLAYERS,
        },
      };

    case constants.ADDING_PLAYERS:
      // adds a new player to the players list
      if (_.size(state.players.Data) === constants.MAXIMUM_PLAYERS)
        return { ...state, audienceSize: state.audienceSize++ };
      return {
        ...state,
        players: {
          ...state.players,
          [action.payload.playerId]: {
            name: action.payload.name,
            vip: !_.size(state.players.Data),
            score: 0,
          },
        },
      };

    case constants.START_TUTORIAL:
      // game's current round is "TUTORIAL ROUND"
      // questions payload is initialized from the action
      return {
        ...state,
        currentState: {
          ...state.currentState,
          name: constants.TUTORIAL_ROUND,
        },
        questions: action.payload.questions,
      };

    case constants.ROUND_ONE:
      // game's current round should be "ROUND ONE"
      return {
        ...state,
        currentState: {
          ...state.currentState,
          roundId: constants.ROUND_ONE,
        },
      };

    case constants.ROUND_TWO:
      // game's current round should be "ROUND TWO"
      return {
        ...state,
        currentState: {
          ...state.currentState,
          roundId: constants.ROUND_TWO,
        },
      };

    case constants.FINAL_ROUND:
      // game's current round should be "FINAL_ROUND"
      return {
        ...state,
        currentState: {
          ...state.currentState,
          roundId: constants.FINAL_ROUND,
        },
      };

    case constants.END_GAME:
      // game's current round should be "END_GAME"
      return {
        ...state,
        currentState: {
          ...state.currentState,
          roundId: constants.END_GAME,
        },
      };

    case constants.ANSWER_QUESTIONS:
      // game's current state should be "ANSWER_QUESTIONS"
      // this is a game state reducer only
      return {
        ...state,
        currentState: {
          ...state.currentState,
          name: constants.ANSWER_QUESTIONS,
        },
      };

    case constants.PLAYER_VOTING:
      // game's current state should be "PLAYER_VOTING"
      // this is a game state reducer only
      return {
        ...state,
        currentState: {
          ...state.currentState,
          name: constants.PLAYER_VOTING,
        },
      };

    case constants.UPDATE_SCORES:
      // game's current state should be "UPDATE_SCORES"
      return {
        ...state,
        currentState: {
          ...state.currentState,
          name: constants.UPDATE_SCORES,
        },
      };

    case constants.UPDATE_LEADERBOARD:
      // game's current state should be "UPDATE_LEADERBOARD"
      // this is a game state reducer only
      return {
        ...state,
        currentState: {
          ...state.currentState,
          name: constants.UPDATE_LEADERBOARD,
        },
      };

    case constants.ADD_AUDIENCE:
      // incriments the audience state value
      return {
        ...state,
        audienceSize: state.audienceSize++,
      };

    case constants.ADD_ANSWER:
      // Add an answer into the state
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.answerId]: {
            questionId: action.payload.questionId,
            playerId: action.payload.playerId,
            contnent: action.payload.content,
          },
        },
      };

    case constants.ADD_PLAYER_VOTE:
      // insert a player's vote into the state
      return {
        ...state,
        votes: {
          ...state.votes,
          [action.payload.voteId]: {
            questionId: action.payload.questionId,
            playerId: action.payload.playerId,
          },
        },
      };

    case constants.ADD_AUDIENCE_VOTE:
      // insert an audience member's vote into the state
      return {
        ...state,
        audienceVotes: {
          ...state.audienceVotes,
          [action.payload.answerId]: state.audienceVotes[
            action.payload.answerId
          ]
            ? state.audienceVotes[action.payload.answerId]++
            : 1,
        },
      };

    case constants.SET_SCORES:
      // should update the player score for the answer
      // audience aggs to 1 vote
      // Round 1 50 pts per vote
      // Round 2 100 pts per vote (2x)
      // Round 3 200 pts per vote (4x)
      const multiplier = [state.rounds[state.currentState.roundId]].scoreMultiplier;
      
      // get all of the answers for this question
      var answers = _.pickBy([state.answers], function (value, key) {
        if (value.questionId === [action.payload.questionId]) {
          return value;
        }
      });

      // get the answer IDs
      const answerIds = Object.keys(answers); // answers will have exactly 2 elements
      const answerA = answerIds[0];
      const answerB = answerIds[1];

      // get the player IDs
      const playerA = [answers[answerA]].playerId
      const playerB = [answers[answerB]].playerId

      // get all votes for each answer ID
      const votesA = _.pickBy([state.votes], function (value, key) {
        if (value.answerId === answerA) {
          return value;
        }
      });
      const votesB = _.pickBy(state.votes, function (value, key) {
        if (value.answerId === answerB) {
          return value;
        }
      });
      
      // get all audience votes for each answer ID
      var audienceA = state.audienceVotes[answerA]
        ? state.audienceVotes[answerA]
        : 0;
      var audienceB = state.audienceVotes[answerB]
        ? state.audienceVotes[answerB]
        : 0;
      
      // determine who the audience voted for
      if (audienceA === audienceB){
        // if they tied audience vote, split the vote
        audienceA = 0.5;
        audienceB = 0.5;
      } else if (audienceA > audienceB){
        // A gets the audience vote
        audienceA = 1;
        audienceB = 0;
      } else {
        // B gets the audience vote
        audienceA = 0;
        audienceB = 1;
      }

      // TODO: calculate the total score for A and B
      const totalScoreA =
        (votesA.length + audienceA) * multiplier * constants.BASE_POINTS;
      const totalScoreB =
        (votesB.length + audienceB) * multiplier * constants.BASE_POINTS;
      
      return {
        ...state,
        players: {
          ...state.players,
          playerA: {
            ...state.players[playerA],
            score: [state.players[playerA]].score + totalScoreA,
          },
          playerB: {
            ...state.players[playerB],
            score: [state.players[playerB]].score + totalScoreB,
          }
        },
        answers: {
          ...state.answers,
          answerA: {
            ...state.answers[answerA],
            score: [state.answers[answerA]].score + totalScoreA,
          },
          answerB: {
            ...state.answers[answerB],
            score: [state.answers[answerB]].score + totalScoreB,
          }
        }
      };

    default:
      return state;
  }
}
