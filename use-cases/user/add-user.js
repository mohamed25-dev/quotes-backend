const makeUser = require('../../entities/user/index');
const makeAddUser = function ( UserDataAccess, RoleDataAccess, AppExceptions) {
  return async function addUser (userInfo) {
    let userRoles = [];
    let user = await UserDataAccess.findByUsername(userInfo.username);
    
    if (user) {
      throw new AppExceptions.InvalidInputException('Author with the same name already exist');
    }

    if (userInfo.roleId) {
        let role = await RoleDataAccess.findById(userInfo.roleId);
        if (!role) {
          throw new AppExceptions.NotFoundException('Role not found');
        }
        userRoles[0] = role;
    } else {
      let role = await RoleDataAccess.findById(3); //Default Role is user
      userRoles[0] = (role); 
    }

    user = await makeUser(userInfo);

    user = await UserDataAccess.insert({
      phoneNumber: user.getPhoneNumber(),
      username: user.getUsername(),
      type: user.getType(),
      fullName: user.getFullName(),
      password: user.getPassword(),
      isEnabled: user.getIsEnabled(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt()
    });

    await user.setRoles(userRoles);
    return UserDataAccess.findByUsername(userInfo.username);
  }
}

module.exports = makeAddUser;
