const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserDataAccess  = require('../../data-access/user/index');
const RoleDataAccess  = require('../../data-access/role/index');

const AppExceptions = require('../../common/errors/exceptions');

const compare = function (password, hash) {
  return bcrypt.compare(password, hash);
}

const hash = async function (password) {
  return await bcrypt.hash(password, 8);
}


const generateAuthToken = async function (user) {
  let remaningHours = 24 - new Date().getHours(); // Remaingin Hours to the end of the day
  let permissions = [];

  let userRoles = user.roles;

  for(let i = 0; i < userRoles.length; i++) {
    for(let j = 0; j < userRoles[i].permissions.length; j++) {
      permissions.push(userRoles[i].permissions[j].permissionName);
    }
  }
  
  let token = await jwt.sign({ userId: user.userId, username: user.username, permissions: permissions},
      'strongKey', 
      {expiresIn: `${remaningHours}h`}
  );

  return token;
}

const makeListUsers = require('./list-user');
const makeAddUser = require('./add-user');
const makeEditUser = require('./edit-user');
const makeRemoveUser = require('./remove-user');
const makeUserLogin = require('./user-login');
const makeResetPassword = require('./reset-password');
const makeUpdatePassword = require('./update-password');
const makeGetUser = require('./get-user');


const addUser    = makeAddUser(UserDataAccess, RoleDataAccess, AppExceptions);
const listUsers  = makeListUsers(UserDataAccess);
const getUser    = makeGetUser(UserDataAccess, AppExceptions);
const editUser   = makeEditUser(UserDataAccess, RoleDataAccess, AppExceptions);
const removeUser = makeRemoveUser(UserDataAccess, AppExceptions);
const userLogin  = makeUserLogin(UserDataAccess, compare, generateAuthToken, AppExceptions);
const resetPassword = makeResetPassword(UserDataAccess, hash, AppExceptions);
const updatePassword = makeUpdatePassword(UserDataAccess, hash, AppExceptions);

const userServices = Object.freeze({
  listUsers,
  addUser,
  editUser,
  removeUser,
  userLogin,
  resetPassword,
  updatePassword,
  getUser
});

module.exports = userServices;