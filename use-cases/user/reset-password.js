const makeResetPassword = function ( dataAccess, hash, AppExceptions) {
  return async function resetPassword (userId) {
    const user = await dataAccess.findById(userId);
    
    if (!user) {
      throw new AppExceptions.NotFoundException('User not found');
    }

    let password = process.env.DEFAULT_PASS || 'noonecandoit';
    let hashedPass = await hash(password);

    await dataAccess.updatePassword(userId, hashedPass);
      
    return;
  }
}

module.exports = makeResetPassword;
