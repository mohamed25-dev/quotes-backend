const makeEditQuote = function (QuoteDataAccess, AuthorDataAccess, CategoryDataAccess, AppExceptions) {
  return async function editQuote(quoteId, updatedQuote) {

    //Check if Quote exist
    let quote = await QuoteDataAccess.findById(quoteId);
    if (!quote) {
      throw new AppExceptions.NotFoundException('Quote not found');
    }

    //Validate the input
    if (updatedQuote.quote) {
      if (updatedQuote.quote.length < 3) {
        throw new AppExceptions.InvalidInputException('quote must be valid');
      }
    }

    if (updatedQuote.authorId) {
      let author = await AuthorDataAccess.findById(updatedQuote.authorId);
      if (!author) {
        throw new AppExceptions.InvalidInputException('author Does not exist');
      }
    }

    if (updatedQuote.categoryId) {
      let category = await CategoryDataAccess.findById(updatedQuote.categoryId);
      if (!category) {
        throw new AppExceptions.InvalidInputException('Category Does not exist');
      }
    }

    //Update it
    await QuoteDataAccess.update(quoteId, updatedQuote);
    return QuoteDataAccess.findById(quoteId);
  }
}

module.exports = makeEditQuote;
