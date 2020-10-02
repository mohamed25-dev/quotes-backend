const makeListUsers = function ( dataAccess ) {
  return async function listUsers () {
    return dataAccess.findAll();
  }
}

module.exports = makeListUsers;
