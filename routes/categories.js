const express = require('express');
const router  = new express.Router();
const auth    = require('../middleware/auth');
const category    = require('../controllers/categoryController');
const { checkPermission } = require('../middleware/checkPermission');
const { 
  postCategory,
  patchCategory,
  deleteCategory,
  getCategories 
} 
= require('../controllers/category/index');
const makeCallback = require('../helper/express-callback');

//Get all Categories
router.get('/categories', makeCallback(getCategories));

//Create Category
router.post('/categories', auth, checkPermission('accounts'),  makeCallback(postCategory));

//Update Category
router.patch('/categories/:categoryId',auth, checkPermission('accounts'), makeCallback(patchCategory))

//Get Category 
router.get('/categories/:categoryId', auth, checkPermission('accounts'), category.get);

//Delete Category 
router.delete('/categories/:categoryId', auth, checkPermission('accounts'),  makeCallback(deleteCategory));


module.exports = router;