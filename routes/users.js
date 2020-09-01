const express = require('express');
const router  = new express.Router();
const user    = require('../controllers/userController');
const auth    = require('../middleware/auth');
const {checkPermission} = require('../middleware/checkPermission');

//Get all Users
router.get('/users', auth, checkPermission('accounts'), user.list);

//Create  User
router.post('/users', user.create);

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
router.patch('/users/:userId', auth, checkPermission('accounts'), user.update);

//Get User 
router.get('/users/:userId', auth, checkPermission('accounts'), user.get);

//Delete User 
router.delete('/users/:userId', auth, checkPermission('accounts'), user.delete);

module.exports = router;