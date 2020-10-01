const { listPermissions } = require('../../use-cases/permission/index');

const makeGetPermissions = require('./get-permissions');

const getPermissions = makeGetPermissions(listPermissions);

const permissionController = Object.freeze({
  getPermissions
});

module.exports = permissionController;
