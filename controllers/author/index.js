const { listAuthors, addAuthor, editAuthor, removeAuthor } = require('../../use-cases/author/index');

const makeGetAuthors = require('./get-authors');
const makePostAuthor = require('./post-author');
const makePatchAuthor = require('./patch-author');
const makeDeleteAuthor = require('./delete-author');


const getAuthors = makeGetAuthors(listAuthors);
const postAuthor = makePostAuthor(addAuthor);
const patchAuthor = makePatchAuthor(editAuthor);
const deleteAuthor = makeDeleteAuthor(removeAuthor);


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
  postAuthor,
  patchAuthor,
  deleteAuthor
});

module.exports = authorController;
