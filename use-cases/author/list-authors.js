const makeListAuthors = function ( DataAccess ) {
  return async function listAuthors () {
    return DataAccess.findAll();
  }
}

module.exports = makeListAuthors;
