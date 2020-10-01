const { listCategories, addCategory } = require('../../use-cases/category/index');

const makeGetCategories = require('./get-categories');
const makePostCategory  = require('./post-category');

const getCategories = makeGetCategories(listCategories);
const postCategory = makePostCategory(addCategory);

let httpRequest = {};
httpRequest.query = {
  authorId: 3
};
httpRequest.body = {
  category: {
    categoryName: 'He',
    categoryImage: 'hello_image'
  }
}

// postCategory(httpRequest)
//   .then(data => console.log(data.body))
//   .catch(error => console.log(error));

getCategories(httpRequest)
  .then(data => console.log(data.body))
  .catch(error => console.log(error));

const categoryController = Object.freeze({
  getCategories,
  postCategory
});

module.exports = categoryController;
