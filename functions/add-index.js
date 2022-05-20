const axios = require('axios');

exports.handler = async function (event) {
  const {
    tkn, dbId, dbRegion, 
    ksName, tableName, reqBody
  } = JSON.parse(event.body);
  try {
      const {data} = await axios.post(
        `https://${dbId}-${dbRegion}.apps.astra.datastax.com/api/rest/v2/schemas/keyspaces/${ksName}/tables/${tableName}/indexes`, 
        {...reqBody},
        {headers: {'X-Cassandra-Token': `${tkn}`,}
      });
    return {
      statusCode: 200,
      body: JSON.stringify("Index has been created")
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify("Couldn't create index")
    };
  }
};
