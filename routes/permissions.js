const express = require('express');
const router  = new express.Router();
const auth    = require('../middleware/auth');
const permission    = require('../controllers/permissionController');
const {checkPermission} = require('../middleware/checkPermission');
const { getPermissions } = require('../controllers/permission/index');
const makeCallback = require('../helper/express-callback');

//Get all Permission
router.get('/permissions', makeCallback(getPermissions));

//Create Permission
router.post('/permissions', auth, checkPermission('accounts'), permission.create);

//Update Permission
router.patch('/permissions/:permissionId', auth, checkPermission('accounts'), permission.update);

//Get Permission 
router.get('/permissions/:permissionId', auth, checkPermission('accounts'), permission.get);

//Delete Permission 
router.delete('/permissions/:permissionId', auth, checkPermission('accounts'), permission.delete);

module.exports = router;