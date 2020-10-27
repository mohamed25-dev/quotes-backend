const makeEditUser = function (UserDataAccess, RoleDataAccess, AppExceptions) {
  return async function editUser(userId, updatedUser) {
    let userRoles = [];
    //Check if user exist
    let user = await UserDataAccess.findById(userId);
    if (!user) {
      throw new AppExceptions.NotFoundException('User not found');
    }

    if (updatedUser.username) {
      let duplicate = await UserDataAccess.findByUsernameExceptId(userId, updatedUser.username);
      if (duplicate) {
        throw new AppExceptions.NotFoundException('User withe the same Username already exist');
      }
  
      //Validate the input
      if (updatedUser.fullName.length < 3) {
        throw new AppExceptions.InvalidInputException('fullName is not valid');
      }
    }

    if (updatedUser.roleId) {
      let role = await RoleDataAccess.findById(updatedUser.roleId);
      if (!role) {
        throw new AppExceptions.NotFoundException('Role not found');
      }
      userRoles[0] = role;
    } else {
      let role = await RoleDataAccess.findById(3); //Default Role is user
      userRoles[0] = (role);
    }

    //Update it
    await UserDataAccess.update(userId, updatedUser);
    return UserDataAccess.findById(userId);
  }
}

module.exports = makeEditUser;
