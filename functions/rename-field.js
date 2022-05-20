const axios = require('axios');

exports.handler = async function (event) {
  const {tkn, dbId, dbRegion, ksName, tName, renamed} = JSON.parse(event.body);
  try {
      const {data} = await axios.put(
        `https://${dbId}-${dbRegion}.apps.astra.datastax.com/api/rest/v2/schemas/keyspaces/${ksName}/types/`,
        {name: tName, renameFields: [renamed]},
        {headers: {'X-Cassandra-Token': `${tkn}`}}
      );
    return {
      statusCode: 200,
      body: JSON.stringify('Field renamed')
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify("Couldn't rename field")
    };
  }
};
