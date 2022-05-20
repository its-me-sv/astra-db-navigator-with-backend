const axios = require('axios');

exports.handler = async function (event) {
  const {dbId, tkn, ksName} = JSON.parse(event.body);
  try {
    const {data} = await axios.post(
      `https://api.astra.datastax.com/v2/databases/${dbId}/keyspaces/${ksName}`,
      {},
      {headers: {Authorization: `Bearer ${tkn}`}
    });
    return {
      statusCode: 200,
      body: JSON.stringify("Keyspace creation initiated")
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify("Unable to create keyspace")
    };
  }
};
