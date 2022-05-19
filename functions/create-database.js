const axios = require('axios');

exports.handler = async function (event) {
  const {requestBody, tkn} = JSON.parse(event.body);

  try {
    const {data} = await axios.post(
      `https://api.astra.datastax.com/v2/databases`, 
      {...requestBody}, 
      {headers: {Authorization: `Bearer ${tkn}`}
    });
    return {
      statusCode: 200,
      body: JSON.stringify("Database creation initiated")
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify("Unable to create database")
    };
  }
};
