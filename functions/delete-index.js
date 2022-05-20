const axios = require('axios');

exports.handler = async function (event) {
  const {
    tkn, dbId, dbRegion, 
    ksName, tableName, idxName
  } = JSON.parse(event.body);
  try {
      const {data} = await axios.delete(
        `https://${dbId}-${dbRegion}.apps.astra.datastax.com/api/rest/v2/schemas/keyspaces/${ksName}/tables/${tableName}/indexes/${idxName}`, 
        {headers: {'X-Cassandra-Token': `${tkn}`,}
      });
    return {
      statusCode: 200,
      body: JSON.stringify("Index has been deleted")
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify("Couldn't delete index")
    };
  }
};
