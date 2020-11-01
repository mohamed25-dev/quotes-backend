const makeListUsers = function ( dataAccess, AppExceptions) {
  return async function listUsers (userId) {
    let options = {};

    if (userId) {
      options.where = {
        userId
      }
    }

    let users = await dataAccess.findAll(options);

    if (userId && users.length < 1) {
      throw new AppExceptions.NotFoundException('User Not Found');
    }

    return users;
  }
}

module.exports = makeListUsers;
