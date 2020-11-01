const db = require('../../models/index');
const Op = db.Op;

const User  = db.users;
const Role  = db.roles;
const Permission = db.permissions;

const makeUsersDb = require('./user');
const usersDb = makeUsersDb(User, Role, Permission, Op);

module.exports = usersDb;
