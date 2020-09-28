const makePostQuote = function(addQuote) {
  return async function postQuote(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      let quoteInfo = httpRequest.body.quote;
      const quote = await addQuote(quoteInfo);

      return {
        headers,
        statusCode: 201,
        body: quote
      }
    } catch (e) {
      return {
        headers,
        statusCode: 500,
        body: {
          error: e.message
        }
      }
    }
  }
}

module.exports = makePostQuote;