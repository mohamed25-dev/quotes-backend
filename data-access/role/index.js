const db = require('../../models/index');
const Role  = db.roles;

const makeRolesDb = require('./role');
const RolesDb = makeRolesDb(Role);

module.exports = RolesDb;
