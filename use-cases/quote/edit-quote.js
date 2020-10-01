const makeEditQuote = function ( dataAccess ) {
  return async function editQuote (quoteId, updatedQuote) {

    //Check if Quote exist
    let quote = await dataAccess.findById(quoteId);
    if (!quote) {
      throw new Error('Quote not found'); 
    }

    //Validate the input
    if (updatedQuote.quote) {
      if (updatedQuote.quote.length < 3) {
        throw new Error('quote must be valid');
      }
    }

    if (updatedQuote.categoryId) {
      //TODO: make sure it is a valid category id
    }

    if (updatedQuote.authorId) {
      //TODO: make sure it is a valid author id
    }

    //Update it
    await dataAccess.update(quoteId, updatedQuote);
    return dataAccess.findById(quoteId);
  }
}

module.exports = makeEditQuote;
