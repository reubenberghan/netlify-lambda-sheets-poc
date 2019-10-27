require('dotenv').config()

const { google } = require('googleapis')
const fetch = require('node-fetch')

const makeCredentials = require('../makeCredentials')
const resultsToRange = require('../resultsToRange')

const { URL } = process.env
const credentials = makeCredentials()
const scopes = ['https://www.googleapis.com/auth/spreadsheets']
const spreadsheetId = process.env.SPREADSHEET_ID || ''

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    // get results from another functions (which deals with the data access)
    const response = await fetch(`${URL}/.netlify/functions/get-results`)
    const body = await response.json()
    const resultsRange = resultsToRange(body.results)

    // console.log(resultsRange)

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

    // get values from google sheet to figure out the next row for updating
    const { data: { values = [] } = {} } = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `Sheet1!A:A`,
    })

    const nextRow = values.length + 1

    // console.log(nextRow)

    const updateRange = `Sheet1!A${nextRow}`

    // update google sheet with request body value
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: updateRange,
      valueInputOption: 'RAW',
      resource: {
        range: updateRange,
        values: resultsRange,
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Results written`, results: body.results }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
