const express = require('express');
const router  = new express.Router();
const user    = require('../controllers/userController');
const auth    = require('../middleware/auth');
const { checkPermission } = require('../middleware/checkPermission');
const { getUsers, postUser, patchUser, deleteUser, userLogin, resetPassword, updatePassword } = require('../controllers/user/index');
const makeCallback = require('../helper/express-callback');

//Get all Users
router.get('/users', makeCallback(getUsers));

//Create  User
router.post('/users', makeCallback(postUser));

//Login User
router.post('/users/login', makeCallback(userLogin));

//Get User Profile
router.get('/users/me', auth, checkPermission('accounts'), user.profile);

//Update User
router.patch('/users/:userId', makeCallback(patchUser));

//Get User 
router.get('/users/:userId', auth, checkPermission('accounts'), user.get);

//Delete User 
router.delete('/users/:userId', makeCallback(deleteUser));

// Reset Password to default
router.post('/users/password/:userId', auth, checkPermission('accounts'), makeCallback(resetPassword));

// Update Password
router.patch('/users/password/:userId', auth, checkPermission('accounts'), makeCallback(updatePassword));


module.exports = router;