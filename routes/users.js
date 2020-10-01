const express = require('express');
const router  = new express.Router();
const user    = require('../controllers/userController');
const auth    = require('../middleware/auth');
const {checkPermission} = require('../middleware/checkPermission');
const { getUsers, postUser, patchUser, deleteUser } = require('../controllers/user/index');
const makeCallback = require('../helper/express-callback');

//Get all Users
router.get('/users', makeCallback(getUsers));

//Create  User
router.post('/users', makeCallback(postUser));

//Login User
router.post('/users/login', user.login);

//Get User Profile
router.get('/users/me', auth, checkPermission('accounts'), user.profile);

//Check user name availability
router.get('/users/checkUsername/:username', user.checkUsername);

//Reset Password 
router.patch('/users/resetPassword/:userId', auth, checkPermission('accounts'), user.resetpassword);

//Update Password 
router.patch('/users/updatePassword/me', auth, checkPermission('accounts'), user.updatePassword);

//Update User
router.patch('/users/:userId', makeCallback(patchUser));

//Get User 
router.get('/users/:userId', auth, checkPermission('accounts'), user.get);

//Delete User 
router.delete('/users/:userId', makeCallback(deleteUser));

module.exports = router;