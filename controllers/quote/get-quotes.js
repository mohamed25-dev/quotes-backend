const makeGetQuotes = function(listQuotes) {
  return async function getQuotes(httpRequest) {
      let authorId = httpRequest.params.authorId;
      let quotes = await listQuotes(authorId);

      return {
        statusCode: 200,
        body: { quotes }
      }
  }
}

module.exports = makeGetQuotes;