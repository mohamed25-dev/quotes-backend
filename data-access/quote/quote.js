const makeQuotesDb = function (QuoteDb) {
  async function findAll(options) {
    return QuoteDb.findAll(options);
  }
  
  async function insert(quote) {
    return QuoteDb.create(quote);
  }

  async function update(quoteId, updatedQuote) {
    return QuoteDb.update(updatedQuote, {
      where: {
        quoteId
      }
    });
  }

  async function remove(quoteId) {
    return QuoteDb.destroy({
      where: {
        quoteId
      }
    });
  }

  async function findById(quoteId) {
    return QuoteDb.findByPk(quoteId);
  }
  
  return Object.freeze({
    findAll,
    insert,
    update,
    remove,
    findById
  });
}

module.exports = makeQuotesDb;
