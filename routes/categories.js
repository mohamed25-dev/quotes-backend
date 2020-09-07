const express = require('express');
const router  = new express.Router();
const auth    = require('../middleware/auth');
const category    = require('../controllers/categoryController');
const {checkPermission} = require('../middleware/checkPermission');

//Get all Categories
router.get('/categories', category.list);

//Create Category
router.post('/categories', auth, checkPermission('accounts'), category.create);

//Update Category
router.patch('/categories/:categoryId', auth, checkPermission('accounts'), category.update)

//Get Category 
router.get('/categories/:categoryId', auth, checkPermission('accounts'), category.get);

//Delete Category 
router.delete('/categories/:categoryId', auth, checkPermission('accounts'), category.delete);


module.exports = router;