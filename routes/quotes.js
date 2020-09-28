const express = require('express');
const router  = new express.Router();
const auth    = require('../middleware/auth');
const quote    = require('../controllers/quotesController');
const {checkPermission} = require('../middleware/checkPermission');
const { getQuotes } = require('../controllers/quote/index');
const makeCallback = require('../helper/express-callback');

//Get all Quotes
router.get('/quotes', makeCallback(getQuotes));

//Get all Quotes By an Author
router.get('/quotes/author/:authorId', makeCallback(getQuotes));

//Get all Quotes By a Category
router.get('/quotes/category/:categoryId', quote.listByCategory);

//Create Quote
router.post('/quotes', auth, checkPermission('accounts'), quote.create);

//Update Quote
router.patch('/quotes/:quoteId', auth, checkPermission('accounts'), quote.update)

//Get Quote 
router.get('/quotes/:quoteId', auth, checkPermission('accounts'), quote.get);

//Delete Quote 
router.delete('/quotes/:quoteId', auth, checkPermission('accounts'), quote.delete);


module.exports = router;