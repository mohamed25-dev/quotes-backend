const makeRemoveQuote = function ( QuotesDataAccess, AppExceptions) {
  return async function removeQuote (quoteId) {
    let quote = await QuotesDataAccess.findById(quoteId);
    if (!quote) {
      throw new AppExceptions.NotFoundException('Quote not found');
    }
    
    return QuotesDataAccess.remove(quoteId);
  }
}

module.exports = makeRemoveQuote;
