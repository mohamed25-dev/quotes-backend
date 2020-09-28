const { listQuotes, addQuote } = require('../../use-cases/quote/index');

const makeGetQuotes = require('./get-quotes');
const makePostQuote = require('./post-quote');

const getQuotes = makeGetQuotes(listQuotes);
const postQuote = makePostQuote(addQuote);

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
  postQuote
});

module.exports = quoteController;
