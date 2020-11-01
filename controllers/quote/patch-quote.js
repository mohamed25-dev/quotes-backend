const makePatchQuote = function(editQuote) {
  return async function patchQuote(httpRequest) {
      let updatedQuoteInfo = httpRequest.body;
      let quoteId = httpRequest.params.quoteId;

      let quote = await editQuote(quoteId, updatedQuoteInfo);

      return {
        statusCode: 200,
        body: { quote }
      }
  }
}

module.exports = makePatchQuote;