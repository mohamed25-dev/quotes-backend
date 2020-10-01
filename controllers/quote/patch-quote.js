const makePatchQuote = function(editQuote) {
  return async function patchQuote(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      let updatedQuoteInfo = httpRequest.body;
      let quoteId = httpRequest.params.quoteId;

      let quote = await editQuote(quoteId, updatedQuoteInfo);

      return {
        headers,
        statusCode: 200,
        body: {
          quote
        }
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

module.exports = makePatchQuote;