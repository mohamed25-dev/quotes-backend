const makeRolesDb = function (RoleDb) {
  async function findAll(options) {
    return RoleDb.findAll(options);
  }

  async function findById(roleId) {
    return RoleDb.findByPk(roleId);
  }
  
  return Object.freeze({
    findAll,
    findById
  });
}

module.exports = makeRolesDb;
