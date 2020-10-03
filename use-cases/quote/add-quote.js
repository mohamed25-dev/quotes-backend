const makeQuote = require('../../entities/quote/index');
const makeAddQuote = function ( QuoteDataAccess, AuthorDataAccess, CategoryDataAccess, AppExceptions) {
  return async function addQuote (quoteInfo) {
    let quote = makeQuote(quoteInfo);

    let author = await AuthorDataAccess.findById(quoteInfo.authorId);
    if (!author) {
      throw new AppExceptions.InvalidInputException('Author Does not exist');
    }
    
    let category = await CategoryDataAccess.findById(quoteInfo.categoryId);
    if (!category) {
      throw new AppExceptions.InvalidInputException('Category Does not exist');
    }
    
    return QuoteDataAccess.insert({
      quote: quote.getQuote(),
      authorId: quote.getAuthorId(),
      categoryId: quote.getCategoryId(),
      createdAt: quote.getCreatedAt(),
      updatedAt: quote.getUpdatedAt()
    });
  }
}

module.exports = makeAddQuote;
