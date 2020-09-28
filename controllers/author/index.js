const { listAuthors, addAuthor } = require('../../use-cases/author/index');

const makeGetAuthors = require('./get-authors');
const makePostAuthor = require('./post-author');

const getAuthors = makeGetAuthors(listAuthors);
const postAuthor = makePostAuthor(addAuthor);

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

const authorController = Object.freeze({
  getAuthors,
  postAuthor
});

module.exports = authorController;
