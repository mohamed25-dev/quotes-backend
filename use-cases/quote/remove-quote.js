const makeRemoveQuote = function ( dataAccess ) {
  return async function removeQuote (quoteId) {
    let quote = await dataAccess.findById(quoteId);
    if (!quote) {
      throw new Error('Quote not found'); 
    }
    
    return dataAccess.remove(quoteId);
  }
}

module.exports = makeRemoveQuote;
