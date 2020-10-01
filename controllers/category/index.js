const {
  listCategories,
  addCategory,
  editCategory,
  removeCategory
} = require('../../use-cases/category/index');

const makeGetCategories = require('./get-categories');
const makePostCategory  = require('./post-category');
const makePatchCategory  = require('./patch-category');
const makeDeleteCategory  = require('./delete-category');


const getCategories = makeGetCategories(listCategories);
const postCategory = makePostCategory(addCategory);
const patchCategory = makePatchCategory(editCategory);
const deleteCategory = makeDeleteCategory(removeCategory);


let httpRequest = {};
httpRequest.params = {
  categoryId: 55
};
httpRequest.body = {
  category: {
    categoryName: 'Hell',
    categoryImage: 'hello_image'
  }
}

// postCategory(httpRequest)
//   .then(data => console.log(data.body))
//   .catch(error => console.log(error));

// patchCategory(httpRequest).then(data => '<><><><><><><><><>'+ data,).catch(e => console.log(e))

// getCategories(httpRequest)
//   .then(data => console.log(data.body))
//   .catch(error => console.log(error));

const categoryController = Object.freeze({
  getCategories,
  postCategory,
  patchCategory,
  deleteCategory
});

module.exports = categoryController;
