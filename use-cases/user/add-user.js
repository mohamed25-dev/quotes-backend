const makeUser = require('../../entities/user/index');
const makeAddUser = function ( usersDb ) {
  return async function addUser (userInfo) {
    let user = makeUser(userInfo);
    
    return usersDb.insert({
      phoneNumber: user.getPhoneNumber(),
      username: user.getUsername(),
      type: user.getType(),
      fullName: user.getFullName(),
      password: user.getPassword(),
      isEnabled: user.getIsEnabled(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt()
    });
  }
}

module.exports = makeAddUser;
