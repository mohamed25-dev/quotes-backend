const makeDeleteQuote = function(removeQuote) {
  return async function deleteQuote(httpRequest) {
  
      let quoteId = httpRequest.params.quoteId;
      await removeQuote(quoteId);
      return {
        statusCode: 200,
        body: {}
      }
  }
}

module.exports = makeDeleteQuote;