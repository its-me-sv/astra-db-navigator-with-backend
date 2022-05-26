const axios = require('axios');

exports.handler = async function (event) {
  const {
    tkn, dbId, dbRegion, 
    ksName, tableName, reqBody
  } = JSON.parse(event.body);
  try {
    let defaultUrl = `https://${dbId}-${dbRegion}.apps.astra.datastax.com/api/rest/v2/keyspaces/${ksName}/${tableName}/`;
    const params = Object.keys(reqBody);
    const notWhere = params.filter(val => val !== 'where');
    defaultUrl += `?where=${encodeURI(JSON.stringify(reqBody.where))}`;
    for (let param of notWhere) 
      defaultUrl += `&${param}=${encodeURI(reqBody[param])}`;
    const {data} = await axios.get(defaultUrl, {headers: {'X-Cassandra-Token': `${tkn}`}});
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify("Couldn't fetch rows")
    };
  }
};
