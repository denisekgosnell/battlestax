import reducer, { initialState } from "./state";

describe("start a new game reducer", () => {
  // TEST 0: testing the default returns the initialized state
  it("should return the initial state", () => {
    expect(reducer(initialState, {})).toMatchSnapshot();
  });

  // TEST 1: start a new game INIT_GAME
  it("should handle INIT_GAME request", () => {
    expect(
      reducer(initialState, {
        type: "INIT_GAME",
      })
    ).toMatchSnapshot();
  });
  // TEST 2: should add 1 player, and that player should be the vip
  it("should handle ADD_PLAYER request", () => {
    expect(
      reducer(initialState, {
        type: "ADD_PLAYER",
      })
    ).toMatchSnapshot();
  });
  // TEST 4: should add 3 players
  // TEST 5: should start a game with at least 3 players
  // TEST 6: should start a game with no more than 8 players
  // TEST 7: should allow audience members
  // TEST 8: should allow the game to start
  // TEST 9: should move to the game tutorial
  it("should handle ADD_PLAYER request", () => {
    expect(
      reducer(initialState, {
        type: "START_TUTORIAL",
      })
    ).toMatchSnapshot();
  });
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
