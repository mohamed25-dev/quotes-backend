const AuthorsDb  = require('../../data-access/author/index')
const makeListAuthors = require('./list-authors');
const makeAddAuthor = require('./add-author');
const makeEditAuthor = require('./edit-author');
const makeRemoveAuthor = require('./remove-author');


const addAuthor    = makeAddAuthor(AuthorsDb);
const listAuthors  = makeListAuthors(AuthorsDb);
const editAuthor   = makeEditAuthor(AuthorsDb);
const removeAuthor = makeRemoveAuthor(AuthorsDb);


// addAuthor({
//   fullName : 'Mohamed King',
//   image: 'my_image',
//   isEnabled: true
// }).then(data => console.log(data));

// listAuthors().then(data => console.log(data));

const authorServices = Object.freeze({
  listAuthors,
  addAuthor,
  editAuthor,
  removeAuthor
});

module.exports = authorServices;