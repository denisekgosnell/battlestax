const stargate = require("./utils/stargate.js")

exports.handler = async (event, context) => {
  let gameId;
  let gamePayload;
  try {
    gameId = event.path.split("insertGame/")[1].split("/")[0];
    gamePayload = event.path.split("insertGame/")[1].split("/")[1];
  } catch (e) {
    return {
      statusCode: 404,
    };
  }

  const namespace = process.env.ASTRA_DB_KEYSPACE;
  const collection = process.env.GAMES_COLLECTION;

  const stargateClient = await stargate.createClient({
    baseUrl: `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com`,
    username: process.env.ASTRA_DB_USERNAME,
    password: process.env.ASTRA_DB_PASSWORD,
  });

  try {
    const res = await stargateClient.patch(
      `/namespaces/${namespace}/collections/${collection}/${gameId}`,
      gamePayload
    );
    return {
      statusCode: 200,
      body: JSON.stringify(res.jsonResponse),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};
