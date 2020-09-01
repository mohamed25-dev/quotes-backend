const express = require('express');
const router  = new express.Router();
const auth    = require('../middleware/auth');
const role    = require('../controllers/roleController');
const {checkPermission} = require('../middleware/checkPermission');

//Get all Categories
router.get('/categories', role.list);

//Create Category
router.post('/categories', auth, checkPermission('accounts'), role.create);

//Update Category
router.patch('/categories/:categoryId', auth, checkPermission('accounts'), role.update)

//Get Category 
router.get('/categories/:categoryId', auth, checkPermission('accounts'), role.get);

//Delete Category 
router.delete('/categories/:categoryId', auth, checkPermission('accounts'), role.delete);


module.exports = router;