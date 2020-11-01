const makeListQuotes = function ( QuotesDataAccess ) {
  return async function listQuotes (authorId = null) {
    let options = {};

    if (authorId) {
      options.where = {
        authorId: authorId
      }
    }

    return QuotesDataAccess.findAll(options);
  }
}

module.exports = makeListQuotes;
