const bcrypt = require('bcryptjs');
const buildMakeUser = require('./user');
const makeUser = buildMakeUser(hash);

async function hash(password) {
  return await bcrypt.hash(password, 8);
}

module.exports = makeUser;