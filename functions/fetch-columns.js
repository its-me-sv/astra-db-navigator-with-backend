const axios = require('axios');

exports.handler = async function (event) {
  const {
    tkn, dbId, dbRegion, 
    ksName, tableName
  } = JSON.parse(event.body);
  try {
      const {data} = await axios.get(
        `https://${dbId}-${dbRegion}.apps.astra.datastax.com/api/rest/v2/schemas/keyspaces/${ksName}/tables/${tableName}/columns`,
        {headers: {'X-Cassandra-Token': `${tkn}`}
      });
    return {
      statusCode: 200,
      body: JSON.stringify(data.data)
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify("Couldn't fetch columns")
    };
  }
};
