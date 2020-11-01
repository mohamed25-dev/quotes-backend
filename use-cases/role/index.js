const RolesDb  = require('../../data-access/role/index')
const makeListRoles = require('./list-role');

const listRoles  = makeListRoles(RolesDb);

const roleServices = Object.freeze({
  listRoles
});

module.exports = roleServices;