const makeEditUser = function ( dataAccess ) {
  return async function editUser (userId, updatedUser) {

    //Check if user exist
    let user = await dataAccess.findById(userId);
    if (!user) {
      throw new Error('User not found'); 
    }

    //Validate the input
    if (updatedUser.fullName) {
      if (updatedUser.fullName.length < 3) {
        throw new Error('fullName must be valid');
      }
    }

    //Update it
    await dataAccess.update(userId, updatedUser);
    return dataAccess.findById(userId);
  }
}

module.exports = makeEditUser;
