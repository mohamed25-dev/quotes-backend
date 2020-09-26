const makeQuotesDb = function (QuoteDb) {
  async function findAll(options) {
    return QuoteDb.findAll(options);
  }
  
  async function insert(quote) {
    return QuoteDb.create(quote);
  }

  return Object.freeze({
    findAll,
    insert
  });
}

module.exports = makeQuotesDb;
