const db = require('../../models/index');
const Permission  = db.permissions;

const makePermissionsDb = require('./permission');
const permissionsDb = makePermissionsDb(Permission);

module.exports = permissionsDb;
