const { listQuotes, addQuote, editQuote, removeQuote } = require('../../use-cases/quote/index');

const makeGetQuotes = require('./get-quotes');
const makePostQuote = require('./post-quote');
const makePatchQuote = require('./patch-quote');
const makeDeleteQuote = require('./delete-quote');


const getQuotes = makeGetQuotes(listQuotes);
const postQuote = makePostQuote(addQuote);
const patchQuote = makePatchQuote(editQuote);
const deleteQuote = makeDeleteQuote(removeQuote);


// let httpRequest = {};
// httpRequest.query = {
//   authorId: 3
// };
// httpRequest.body = {
//   quote: {
//     quote: 'Hello',
//     authorId: 1,
//     categoryId: 1
//   }
// }

// postQuote(httpRequest)
//   .then(data => console.log(data.body))
//   .catch(error => console.log(error));

// getQuotes(httpRequest)
//   .then(data => console.log(data.body))
//   .catch(error => console.log(error));

const quoteController = Object.freeze({
  getQuotes,
  postQuote,
  patchQuote,
  deleteQuote
});

module.exports = quoteController;
