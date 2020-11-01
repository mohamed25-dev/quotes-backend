const makeGetUser = function ( dataAccess, AppExceptions) {
  return async function getUser (userId) {
    let user = await dataAccess.findById(userId);
    console.log(userId);
    console.log('>>>>>>>>>>>>>>>>>>>');

    if (!user) {
      throw new AppExceptions.NotFoundException('User Not Found');
    }
    
    return user;
  }
}

module.exports = makeGetUser;
