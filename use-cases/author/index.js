const AuthorsDataAccess  = require('../../data-access/author/index');
const AppExceptions = require('../../common/errors/exceptions');

const makeListAuthors = require('./list-authors');
const makeAddAuthor = require('./add-author');
const makeEditAuthor = require('./edit-author');
const makeRemoveAuthor = require('./remove-author');


const addAuthor    = makeAddAuthor(AuthorsDataAccess, AppExceptions);
const listAuthors  = makeListAuthors(AuthorsDataAccess);
const editAuthor   = makeEditAuthor(AuthorsDataAccess, AppExceptions);
const removeAuthor = makeRemoveAuthor(AuthorsDataAccess, AppExceptions);


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