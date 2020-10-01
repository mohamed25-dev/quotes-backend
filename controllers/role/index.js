const { listRoles } = require('../../use-cases/role/index');

const makeGetRoles = require('./get-roles');

const getRoles = makeGetRoles(listRoles);


const roleController = Object.freeze({
  getRoles
});

module.exports = roleController;
