const stargate = require("./utils/stargate.js");

exports.handler = async (event, context) => {
  let path;
  let gamePayload;
  try {
    path = event.path.split("updateGame/")[1];
    gamePayload = JSON.parse(event.body);
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
    console.log(path, gamePayload);
    const res = await stargateClient[event.httpMethod.toLowerCase()](
      `/namespaces/${namespace}/collections/${collection}/${path}`,
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
