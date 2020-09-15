exports.handler = async (event, context) => {
  let gameId;
  try {
    gameId = event.path.split("getGame/")[1];
  } catch (e) {
    return {
      statusCode: 404,
    };
  }

  const namespace = process.env.ASTRA_DB_KEYSPACE;
  const collection = process.env.GAMES_COLLECTION;

  const stargateClient = await stargate.createClient({
    baseUrl: `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com`,
    username: process.env.STARGATE_USERNAME,
    password: process.env.STARGATE_PASSWORD,
  });

  try {
    const res = await stargateClient.get(
      `/namespaces/${namespace}/collections/${collection}/${gameId}`
    );
    console.log(res.jsonResponse)
    return {
      statusCode: 200,
      body: JSON.stringify(res.jsonResponse),
    };
  } catch (e) {
    console.log(res.jsonResponse)
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};
