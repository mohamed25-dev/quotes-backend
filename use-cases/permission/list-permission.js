const makeListPermissions = function ( permissionsDb ) {
  return async function listPermissions () {
    return permissionsDb.findAll();
  }
}

module.exports = makeListPermissions;
