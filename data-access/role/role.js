const makeRolesDb = function (RoleDb) {
  async function findAll(options) {
    return RoleDb.findAll(options);
  }

  return Object.freeze({
    findAll,
  });
}

module.exports = makeRolesDb;
