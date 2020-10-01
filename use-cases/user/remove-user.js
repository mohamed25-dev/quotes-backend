const makeRemoveUser = function ( dataAccess ) {
  return async function removeUser (userId) {
    let user = await dataAccess.findById(userId);
    if (!user) {
      throw new Error('User not found'); 
    }
    
    return dataAccess.remove(userId);
  }
}

module.exports = makeRemoveUser;
