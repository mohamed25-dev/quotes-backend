const express = require('express');
const router  = new express.Router();
const auth    = require('../middleware/auth');
const author    = require('../controllers/authorController');
const {checkPermission} = require('../middleware/checkPermission');
const makeCallback = require('../helper/express-callback');
const { getAuthors, postAuthor, patchAuthor, deleteAuthor } = require('../controllers/author/index');

//Get all Authors
router.get('/authors', makeCallback(getAuthors));

//Create Author
router.post('/authors', auth, checkPermission('accounts'), makeCallback(postAuthor));


//Update Author
router.patch('/authors/:authorId', auth, checkPermission('accounts'), makeCallback(patchAuthor))

//Get Author 
router.get('/authors/:authorId', makeCallback(getAuthors));

//Delete Author 
router.delete('/authors/:authorId', makeCallback(deleteAuthor));


module.exports = router;