const express = require('express');
const router  = new express.Router();
const auth    = require('../middleware/auth');
const role    = require('../controllers/roleController');
const {checkPermission} = require('../middleware/checkPermission');

//Get all Roles
router.get('/roles', auth, checkPermission('accounts'), role.list);

//Create Role
router.post('/roles', auth, checkPermission('accounts'), role.create);

//Update Role
router.patch('/roles/:roleId', auth, checkPermission('accounts'), role.update)

//Get Role 
router.get('/roles/:roleId', auth, checkPermission('accounts'), role.get);

//Delete Role 
router.delete('/roles/:roleId', auth, checkPermission('accounts'), role.delete);


module.exports = router;