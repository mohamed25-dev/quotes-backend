const makeUpdatePassword = function ( dataAccess, hash, AppExceptions) {
  return async function updatePassword (userId, password) {
    const user = await dataAccess.findById(userId);
    
    if (!user) {
      throw new AppExceptions.NotFoundException('User not found');
    }

    let hashedPass = await hash(password);

    await dataAccess.updatePassword(userId, hashedPass);
      
    return;
  }
}

module.exports = makeUpdatePassword;
