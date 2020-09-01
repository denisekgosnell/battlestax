import reducer, { initialState } from "./state";
import constants from "./constants"

describe("start a new game reducer", () => {
  // TEST: testing the default returns the initialized state
  it("should return the initialized state; testing the default", () => {
    expect(
      reducer(initialState, {})
    ).toMatchSnapshot();
  });

  // TEST: initialize the app
  it("should return handle the APP INITIALIZED request", () => {
    expect(
      reducer(initialState, {
        type: constants.APP_INITIALIZED,
      })
    ).toMatchSnapshot();
  });

  // TEST: start a new game INIT_GAME
  it("should handle INIT_GAME request", () => {
    expect(
      reducer(initialState, {
        type: constants.INIT_GAME,
      })
    ).toMatchSnapshot();
  });
  
  // TEST: should add 1 player, and that player should be the vip
  it("should handle ADD_PLAYER request", () => {
    expect(
      reducer(initialState, {
        type: constants.ADD_PLAYER,
      })
    ).toMatchSnapshot();
  });

  // TEST: should start the tutorial
  it("should handle START_TUTORIAL request", () => {
    expect(
      reducer(initialState, {
        type: constants.START_TUTORIAL,
      })
    ).toMatchSnapshot();
  });

  // TEST: should start round one
  it("should handle ROUND_ONE request", () => {
    expect(
      reducer(initialState, {
        type: constants.ROUND_ONE,
      })
    ).toMatchSnapshot();
  });

  // TEST 6: should start a game with no more than 8 players
  // TEST 7: should allow audience members
  // TEST 8: should allow the game to start
  // TEST 9: should move to the game tutorial
  // TEST 10: should move to a question round
  // TEST 11: should receive question responses from players
  // TEST 12: should move to a voting round
  // TEST 13: should receive votes from players
  // TEST 14: should receive votes from the audience
  // TEST 15: should update the leaderboard
  // TEST 16: should move to the leaderboard
  // TEST 17: should move to the end game screen
  // TEST 18: should move to the start game screen
});
