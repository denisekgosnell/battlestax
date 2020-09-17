import constants from "./constants";
import _ from "lodash";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

export const actions = {
  toggleInitialized: () => ({
    type: constants.APP_INITIALIZED,
  }),
  startGame: (gameId) => {
    // provision the game in Astra
    // build out questions, rounds etc
    // start the game
    return {
      type: constants.INIT_GAME,
      payload: gameId,
    };
  },
  addPlayer: (player) => ({
    type: constants.ADDING_PLAYERS,
    payload: player,
  }),
  setCurrentPlayer: (playerId) => ({
    type: constants.SET_CURRENT_PLAYER,
    payload: playerId,
  }),
};

const initialState = {
  initialized: true,
  gameId: "",
  currentPlayerId: "",
  currentState: {}, // name, roundId
  players: {}, // plauyerId, name, totalScore; number of players == number of questions
  audienceSize: 0,
  rounds: {}, // roundId, type, title, score multiplier
  questions: {}, // questionId, roundId, content
  answers: {}, // answerId, questionId, playerId, content, score
  votes: {}, // voteId, answerId, playerId
  audienceVotes: {},
};

const reducer = (state = initialState, action) => {
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
        gameId: action.payload,
        currentState: {
          ...state.currentState,
          name: constants.ADDING_PLAYERS,
        },
      };

    case constants.ADDING_PLAYERS:
      // make sure the player name isn't taken
      if (state.players[action.payload.playerId]) {
        return { ...state };
      }
      // adds a new player to the players list
      if (_.keys(state.players).length === constants.MAXIMUM_PLAYERS)
        return { ...state, audienceSize: state.audienceSize++ };
      return {
        ...state,
        players: {
          ...state.players,
          [action.payload.playerId]: {
            name: action.payload.name,
            vip: _.isEmpty(state.players),
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
      const multiplier =
        state.rounds[state.currentState.roundId].scoreMultiplier;
      // get all of the answers for this question
      const questionAnswers = _.pickBy(
        state.answers,
        (answer) => answer.questionId === action.payload.questionId
      );
      let scoredAnswers = _.mapValues(questionAnswers, (answer, answerId) => {
        // get the votes
        const votes = _.pickBy(
          state.votes,
          (vote) => vote.answerId === answerId
        );
        return {
          ...answer,
          voteCount: _.keys(votes).length,
          audienceVotes: state.audienceVotes[answerId]
            ? state.audienceVotes[answerId]
            : 0,
        };
      });
      // update vote count based on audience votes
      const scoredAnswerKeys = _.keys(scoredAnswers);
      if (
        scoredAnswers[scoredAnswerKeys[0]].audienceVotes ===
        scoredAnswers[scoredAnswerKeys[1]].audienceVotes
      ) {
        scoredAnswers[scoredAnswerKeys[0]].voteCount += 0.5;
        scoredAnswers[scoredAnswerKeys[1]].voteCount += 0.5;
      } else if (
        scoredAnswers[scoredAnswerKeys[0]].audienceVotes <
        scoredAnswers[scoredAnswerKeys[1]].audienceVotes
      ) {
        scoredAnswers[scoredAnswerKeys[1]].voteCount++;
      } else {
        scoredAnswers[scoredAnswerKeys[0]].voteCount++;
      }
      // score each answer
      scoredAnswers = _.mapValues(questionAnswers, (answer) => {
        return {
          ...answer,
          score: answer.voteCount * multiplier * constants.BASE_POINTS,
        };
      });
      // score the players
      const scoredPlayers = {};
      _.mapValues(scoredAnswers, (answer) => {
        scoredPlayers[answer.playerId] = {
          ...state.players[answer.playerId],
          score: state.players[answer.playerId].score + answer.score,
        };
      });
      return {
        ...state,
        players: {
          ...state.players,
          ...scoredPlayers,
        },
        answers: {
          ...state.answers,
          ...scoredAnswers,
        },
      };

    default:
      return state;
  }
};

export const store = createStore(reducer, composeWithDevTools());
