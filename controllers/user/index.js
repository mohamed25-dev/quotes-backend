const { 
  listUsers,
  addUser,
  editUser,
  removeUser,
  userLogin
} = require('../../use-cases/user/index');

const makeGetUsers = require('./get-users');
const makePostUser = require('./post-user');
const makePatchUser = require('./patch-user');
const makeDeleteUser = require('./delete-user');
const makeUserLogin = require('./user-login');


const getUsers = makeGetUsers(listUsers);
const postUser = makePostUser(addUser);
const patchUser = makePatchUser(editUser);
const deleteUser = makeDeleteUser(removeUser);
const login = makeUserLogin(userLogin);

let httpRequest = {};
httpRequest.query = {
  authorId: 3
};
httpRequest.body = {
    username: 'Mitsuke',
    password: '1234'
}

// login(httpRequest)
//   .then(data => console.log(data.body))
//   .catch(error => console.log(error));

// // getUsers(httpRequest)
//   .then(data => console.log(data.body))
//   .catch(error => console.log(error));

const userController = Object.freeze({
  getUsers,
  postUser,
  patchUser,
  deleteUser,
  userLogin: login
});

module.exports = userController;
