const db = require('../../models/index');
const User  = db.users;

const makeUsersDb = require('./user');
const usersDb = makeUsersDb(User);

module.exports = usersDb;
