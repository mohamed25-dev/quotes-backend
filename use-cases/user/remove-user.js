const makeRemoveUser = function ( dataAccess, AppExceptions) {
  return async function removeUser (userId) {
    let user = await dataAccess.findById(userId);
    if (!user) {
      throw new AppExceptions.NotFoundException('User not found');
    }
    
    return dataAccess.remove(userId);
  }
}

module.exports = makeRemoveUser;
