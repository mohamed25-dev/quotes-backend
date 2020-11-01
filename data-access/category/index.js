const db = require('../../models/index');
const Category  = db.categories;

const makeCategoriesDb = require('./category');
const categoriesDb = makeCategoriesDb(Category);

module.exports = categoriesDb;
