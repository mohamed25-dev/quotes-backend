const db = require('../../models/index');
const Quote  = db.quotes;

const makeQuotesDb = require('./quote');
const quotesDb = makeQuotesDb(Quote);

module.exports = quotesDb;
