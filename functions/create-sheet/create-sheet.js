// const fs = require('fs')
// const path = require('path')
// const { google } = require('googleapis')

// const keyfile = path.join(process.cwd(), '.config/credentials.json')
// const keys = JSON.parse(fs.readFileSync(keyfile))

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    // const client = google.auth.fromJSON(keys)
    // client.scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'] // 'https://www.googleapis.com/auth/spreadsheets.readonly' , 'https://www.googleapis.com/auth/cloud-platform'

    // const url = `https://dns.googleapis.com/dns/v1/projects/${keys.project_id}`;
    // const res = await client.request({url});
    // console.log(res.data);

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
