const makeListAuthors = function ( authorsDb ) {
  return async function listAuthors () {
    return authorsDb.findAll();
  }
}

module.exports = makeListAuthors;
