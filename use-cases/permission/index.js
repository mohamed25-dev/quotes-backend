const PermissionsDb  = require('../../data-access/permission/index')
const makeListPermissions = require('./list-permission');

const listPermissions  = makeListPermissions(PermissionsDb);

const permissionServices = Object.freeze({
  listPermissions
});

module.exports = permissionServices;