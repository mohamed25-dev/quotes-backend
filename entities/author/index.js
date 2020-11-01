const AppExceptions = require('../../common/errors/exceptions');

const buildMakeAuthor = require('./author');
const makeAuthor = buildMakeAuthor(AppExceptions);

module.exports = makeAuthor;