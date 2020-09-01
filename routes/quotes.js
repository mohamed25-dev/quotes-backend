const express = require('express');
const router  = new express.Router();
const auth    = require('../middleware/auth');
const quote    = require('../controllers/quotesController');
const {checkPermission} = require('../middleware/checkPermission');

//Get all Quotes
router.get('/quotes', quote.list);

//Create Quote
router.post('/quotes', auth, checkPermission('accounts'), quote.create);

//Update Quote
router.patch('/quotes/:quoteId', auth, checkPermission('accounts'), quote.update)

//Get Quote 
router.get('/quotes/:quoteId', auth, checkPermission('accounts'), quote.get);

//Delete Quote 
router.delete('/quotes/:quoteId', auth, checkPermission('accounts'), quote.delete);


module.exports = router;