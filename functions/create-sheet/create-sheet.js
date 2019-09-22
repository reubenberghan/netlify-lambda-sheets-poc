// const fs = require('fs')
// const path = require('path')
// const { google } = require('googleapis')

// const keyfile = path.join(__dirname, '.config/credentials.json')
// const keys = JSON.parse(fs.readFileSync(keyfile))
// const scopes = ['https://www.googleapis.com/auth/spreadsheets']

// const client = new google.auth.OAuth2(
//   keys.client_id,
//   keys.client_secret
// )

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const subject = event.queryStringParameters.name || "World";
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` })
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
