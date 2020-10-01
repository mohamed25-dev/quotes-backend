const UsersDb  = require('../../data-access/user/index')
const makeListUsers = require('./list-user');
const makeAddUser = require('./add-user');
const makeEditUser = require('./edit-user');
const makeRemoveUser = require('./remove-user');

const addUser    = makeAddUser(UsersDb);
const listUsers  = makeListUsers(UsersDb);
const editUser   = makeEditUser(UsersDb);
const removeUser = makeRemoveUser(UsersDb);


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
  removeUser
});

module.exports = userServices;