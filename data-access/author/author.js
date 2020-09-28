const makeAuthorsDb = function (AuthorDb) {
  async function findAll(options) {
    return AuthorDb.findAll(options);
  }
  
  async function insert(quote) {
    return AuthorDb.create(quote);
  }

  return Object.freeze({
    findAll,
    insert
  });
}

module.exports = makeAuthorsDb;
