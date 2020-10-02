const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UsersDataAccess  = require('../../data-access/user/index');

const compare = function (password, hash) {
  return bcrypt.compare(password, hash);
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

const addUser    = makeAddUser(UsersDataAccess);
const listUsers  = makeListUsers(UsersDataAccess);
const editUser   = makeEditUser(UsersDataAccess);
const removeUser = makeRemoveUser(UsersDataAccess);
const userLogin  = makeUserLogin(UsersDataAccess, compare, generateAuthToken);

// addUser({
//   fullName : 'Mohamed King',
//   image: 'my_image',
//   isEnabled: true
// }).then(data => console.log(data));

// listUsers().then(data => console.log(data));

const userServices = Object.freeze({
  listUsers,
  addUser,
  editUser,
  removeUser,
  userLogin
});

module.exports = userServices;