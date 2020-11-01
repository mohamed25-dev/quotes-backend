const express = require('express');
const router  = new express.Router();
const auth = require('../middleware/auth');
const { checkPermission } = require('../middleware/checkPermission');
const { getPermissions } = require('../controllers/permission/index');
const makeCallback = require('../helper/express-callback');

//Get all Permission
router.get('/permissions', auth, checkPermission('accounts'), makeCallback(getPermissions));

module.exports = router;