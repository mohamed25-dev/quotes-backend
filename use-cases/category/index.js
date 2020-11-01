const CategoriesDataAccess  = require('../../data-access/category/index')
const makeListCategories = require('./list-categories');
const makeAddCategory = require('./add-category');
const makeEditCategory = require('./edit-category');
const makeRemoveCategory = require('./remove-category');

const addCategory   = makeAddCategory(CategoriesDataAccess);
const listCategories = makeListCategories(CategoriesDataAccess);
const editCategory   = makeEditCategory(CategoriesDataAccess);
const removeCategory   = makeRemoveCategory(CategoriesDataAccess);

// addCategory({
  // categoryName : 'Kings Category',
  // categoryImage: 'king_image',
//   isEnabled: true
// }).then(data => console.log(data));

// listCategories().then(data => console.log(data));

// editCategory(5, {
//   categoryName : 'Ki',
//   categoryImage: 'king_image',
//   isEnabled: true
// }).then(() => 'Done').catch(e => console.log(e))


const categoryServices = Object.freeze({
  listCategories,
  addCategory,
  editCategory,
  removeCategory
});

module.exports = categoryServices;