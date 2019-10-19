require('dotenv').config()

const { google } = require('googleapis')

const makeCredentials = require('../makeCredentials')

const credentials = makeCredentials()
const scopes = ['https://www.googleapis.com/auth/spreadsheets']
const spreadsheetId = process.env.SPREADSHEET_ID || ''

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body)

    // get google's auth client
    const client = await google.auth.getClient({
      credentials,
      scopes,
    })

    // get google's sheets client
    const sheets = await google.sheets({
      version: 'v4',
      auth: client,
    })

    const nextRowRange = 'next-row!A1'

    // get next row number from google sheet
    const { data: { values: [[updateRow]] = [] } = {} } = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: nextRowRange,
    })

    const updateRange = `A${updateRow}`
    const nextRow = Number(updateRow) + 1

    // update google sheet with request body value
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: updateRange,
      valueInputOption: 'USER_ENTERED',
      resource: {
        range: updateRange,
        values: [[body.value]],
      },
    })

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: nextRowRange,
      valueInputOption: 'RAW',
      resource: {
        range: nextRowRange,
        values: [[nextRow]],
      },
    })

    const subject = event.queryStringParameters.name || 'World'

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
