const stargate = require("../stargate");
const faker = require("faker");

// setup envars
require("dotenv").config();

/* configure Stargate Client */
// setup test context
const namespace = process.env.ASTRA_KEYSPACE;
const collection = "games";
const gameId = faker.random.alphaNumeric(8);
const docRootPath = `/namespaces/${namespace}/collections/${collection}/${gameId}`;

const stargateClient = stargate.createClient({
  baseUrl: `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com`,
  username: process.env.STARGATE_USERNAME,
  password: process.env.STARGATE_PASSWORD,
});

async function getGame(){
  return Promise.resolve(stargateClient.put(docRootPath,{
    gameCode: "DANG",
    currentState: {
      name: "ADD_PLAYERS",
      roundId: null,
    },
    players: {},
    audienceSize: 0,
    rounds: {
      1: {
        type: "QUESTION",
        title: "Round 1",
        scoreMultiplier: 1,
      },
      2: {
        type: "QUESTION",
        title: "Round 1",
        scoreMultiplier: 2,
      },
      3: {
        type: "COMIC",
        title: "Final Round",
        scoreMultiplier: 3,
      },
    },
    questions: {
      [faker.random.alphaNumeric(8)]: {
        roundId: 1,
        content: "What time is it?",
      },
      [faker.random.alphaNumeric(8)]: {
        roundId: 2,
        content: "What day is it?",
      },
      [faker.random.alphaNumeric(8)]: {
        roundId: 3,
        content: "https://xkcd.com/386/",
      },
    },
    answers: {},
    votes: {},
    audienceVotes: {},
  }));
}

exports.handler = (event, context, callback) => {
  try {
    const body = await getGame();
    return {statusCode: 200, body: body}
  } catch (err) {
    return {statusCode: 500, body: err.toString()};
  }
};
