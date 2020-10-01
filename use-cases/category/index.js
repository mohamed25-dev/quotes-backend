const CategoriesDb  = require('../../data-access/category/index')
const makeListCategories = require('./list-categories');
const makeAddCategory = require('./add-category');

const addCategory   = makeAddCategory(CategoriesDb);
const listCategories = makeListCategories(CategoriesDb);

// addCategory({
//   categoryName : 'Kings Category',
//   categoryImage: 'king_image',
//   isEnabled: true
// }).then(data => console.log(data));

// listCategories().then(data => console.log(data));

const categoryServices = Object.freeze({
  listCategories,
  addCategory
});

module.exports = categoryServices;