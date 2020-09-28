const makeQuote = require('../../entities/quote/index');
const makeAddQuote = function ( quotesDb ) {
  return async function addQuote (quoteInfo) {
    let quote = makeQuote(quoteInfo);
    
    return quotesDb.insert({
      quote: quote.getQuote(),
      authorId: quote.getAuthorId(),
      categoryId: quote.getCategoryId(),
      createdAt: quote.getCreatedAt(),
      updatedAt: quote.getUpdatedAt()
    });
  }
}

module.exports = makeAddQuote;
