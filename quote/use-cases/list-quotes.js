const makeListQuotes = function ( quotesDb ) {
  return async function listQuotes (authorId = null) {
    let options = {};
    
    if (authorId) {
      options.where = {
        authorId: authorId
      }
    }

    return quotesDb.findAll(options);
  }
}

module.exports = makeListQuotes;
