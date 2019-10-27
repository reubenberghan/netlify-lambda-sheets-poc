require('dotenv').config()

const { google } = require('googleapis')

const makeCredentials = require('../makeCredentials')

const credentials = makeCredentials()
const scopes = ['https://www.googleapis.com/auth/spreadsheets']
const spreadsheetId = process.env.SPREADSHEET_ID || ''

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const client = await google.auth.getClient({
      credentials,
      scopes,
    })
    const sheets = await google.sheets({
      version: 'v4',
      auth: client,
    })

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A1:A',
    })

    // console.log(res.data.values.length)

    const subject = event.queryStringParameters.name || 'World'

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Hello ${subject}`,
        sheetValues: res.data.values,
      }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
