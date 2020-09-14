const stargate = require("../stargate");
const faker = require("faker");
const _ = require("lodash");

// setup envars
require("dotenv").config();

/* configure Stargate Client */
// setup test context
let stargateClient = null;
const namespace = process.env.ASTRA_KEYSPACE;
const collection = "games";
const gameId = faker.random.alphaNumeric(8);
const docRootPath = `/namespaces/${namespace}/collections/${collection}/${gameId}`;

before(async () => {
  stargateClient = await stargate.createClient({
    baseUrl: `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com`,
    username: process.env.STARGATE_USERNAME,
    password: process.env.STARGATE_PASSWORD,
  });
});

exports.handler = (event, context, callback) => {
    const res = stargateClient.put(docRootPath, {
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
        });
    // The "callback" ends the execution of the function and returns a response back to the caller
    return callback(null, res)
  }