const makeCategoriesDb = function (CateogryDb) {
  async function findAll(options) {
    return CateogryDb.findAll(options);
  }
  
  async function insert(quote) {
    return CateogryDb.create(quote);
  }

  return Object.freeze({
    findAll,
    insert
  });
}

module.exports = makeCategoriesDb;
