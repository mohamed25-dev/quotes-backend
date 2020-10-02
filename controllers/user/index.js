const { listUsers, addUser, editUser, removeUser } = require('../../use-cases/user/index');

const makeGetUsers = require('./get-users');
const makePostUser = require('./post-user');
const makePatchUser = require('./patch-user');
const makeDeleteUser = require('./delete-user');

const getUsers = makeGetUsers(listUsers);
const postUser = makePostUser(addUser);
const patchUser = makePatchUser(editUser);
const deleteUser = makeDeleteUser(removeUser);


let httpRequest = {};
httpRequest.query = {
  authorId: 3
};
httpRequest.body = {
  user: {
    username: 'Mitsuke',
    fullName: 'Mitsuke Orochimaro',
    password: '1234',
    phoneNumber: '123123',
    type:'admin'
  }
}

postUser(httpRequest)
  .then(data => console.log(data.body))
  .catch(error => console.log(error));

// getUsers(httpRequest)
//   .then(data => console.log(data.body))
//   .catch(error => console.log(error));

const userController = Object.freeze({
  getUsers,
  postUser,
  patchUser,
  deleteUser
});

module.exports = userController;
