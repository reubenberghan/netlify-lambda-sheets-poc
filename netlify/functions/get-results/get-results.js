const results = [
  {
    email: 'bob@mail.co',
    score: 99,
  },
  {
    email: 'jimmy@hoolie.com',
    score: 76,
  },
  {
    email: 'anna@netlify.js',
    score: 89,
  },
  {
    email: 'jane@mail.co',
    score: 99,
  },
]

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}`, results }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
