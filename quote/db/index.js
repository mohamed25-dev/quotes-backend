const db = require('../../models/index');
const Quote  = db.quotes;

const makeQuotesDb = require('./data-access');
const quotesDb = makeQuotesDb(Quote);

module.exports = quotesDb;
