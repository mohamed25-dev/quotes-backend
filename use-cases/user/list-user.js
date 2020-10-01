const makeListUsers = function ( usersDb ) {
  return async function listUsers () {
    return usersDb.findAll();
  }
}

module.exports = makeListUsers;
