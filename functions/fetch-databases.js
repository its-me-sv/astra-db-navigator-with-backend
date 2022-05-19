const axios = require('axios');

exports.handler = async function (event) {
  const {tkn} = JSON.parse(event.body);
  try {
    const {data} = await axios.get(`https://api.astra.datastax.com/v2/databases`, {
      headers: {Authorization: `Bearer ${tkn}`,}
    });
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify("Couldn't fetch databases")
    };
  }
};