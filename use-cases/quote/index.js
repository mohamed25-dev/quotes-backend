const QuotesDb  = require('../../data-access/quote/index')
const makeListQuotes = require('./list-quotes');
const makeAddQuote = require('./add-quote');

const addQuote   = makeAddQuote(QuotesDb);
const listQuotes = makeListQuotes(QuotesDb);

// addQuote({
//   quote: 'This is the most amazing quote',
//   authorId: 1,
//   categoryId: 1
// }).then(data => console.log(data));

// listQuotes(2).then(data => console.log(data));

const quoteServices = Object.freeze({
  listQuotes,
  addQuote
});

module.exports = quoteServices;