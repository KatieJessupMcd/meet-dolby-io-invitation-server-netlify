const { EVENT_CODE } = process.env;

const querystring = require('querystring');

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const eventCode = event.queryStringParameters.eventCode;
  console.log('event code', eventCode);
  console.log('env var', EVENT_CODE);
  if (eventCode === EVENT_CODE) {
    return {
      statusCode: 200,
      body: 'Event Code Correct',
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*', // NOTE this is to allow for CORS when testing locally
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
      },
    };
  } else {
    return {
      statusCode: 401,
      body: 'Event Code Incorrect',
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*', // NOTE this is to allow for CORS when testing locally
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
      },
    };
  }
};
