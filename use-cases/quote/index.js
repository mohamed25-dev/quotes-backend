const AppExceptions = require('../../common/errors/exceptions');

const QuoteDataAccess  = require('../../data-access/quote/index');
const AuthorDataAccess  = require('../../data-access/author/index');
const CategoryDataAccess = require('../../data-access/category/index');

const makeListQuotes = require('./list-quotes');
const makeAddQuote = require('./add-quote');
const makeEditQuote = require('./edit-quote');
const makeRemoveQuote = require('./remove-quote');


const addQuote    = makeAddQuote(QuoteDataAccess, AuthorDataAccess, CategoryDataAccess, AppExceptions);
const listQuotes  = makeListQuotes(QuoteDataAccess);
const editQuote   = makeEditQuote(QuoteDataAccess, AuthorDataAccess, CategoryDataAccess, AppExceptions);
const removeQuote = makeRemoveQuote(QuoteDataAccess);


// addQuote({
//   quote: 'This is the most amazing quote',
//   authorId: 1,
//   categoryId: 1
// }).then(data => console.log(data));

// listQuotes(2).then(data => console.log(data));

const quoteServices = Object.freeze({
  listQuotes,
  addQuote,
  editQuote,
  removeQuote
});

module.exports = quoteServices;