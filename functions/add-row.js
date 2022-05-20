const axios = require('axios');

exports.handler = async function (event) {
  const {
    tkn, dbId, dbRegion, 
    ksName, tName, row
  } = JSON.parse(event.body);
  try {
      const {data} = await axios.post(
        `https://${dbId}-${dbRegion}.apps.astra.datastax.com/api/rest/v2/keyspaces/${ksName}/${tName}`,
        {...row},
        {headers: {'X-Cassandra-Token': `${tkn}`}}
      );
    return {
      statusCode: 200,
      body: JSON.stringify('Row added')
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify("Couldn't add row")
    };
  }
};
