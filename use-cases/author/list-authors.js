const makeListAuthors = function ( authorsDb ) {
  return async function listQuotes () {
    return authorsDb.findAll();
  }
}

module.exports = makeListAuthors;
