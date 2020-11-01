const makePostQuote = function(addQuote) {
  return async function postQuote(httpRequest) {
      let quoteInfo = httpRequest.body;
      const quote = await addQuote(quoteInfo);

      return {
        statusCode: 201,
        body: { quote }
    }
  }
}

module.exports = makePostQuote;