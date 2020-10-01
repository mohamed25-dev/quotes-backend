const makeUsersDb = function (UserDb) {
  async function findAll(options) {
    return UserDb.findAll(options);
  }
  
  async function insert(user) {
    return UserDb.create(user);
  }

  async function update(userId, updatedUser) {
    return UserDb.update(updatedUser, {
      where: {
        userId
      }
    });
  }

  async function remove(userId) {
    return UserDb.destroy({
      where: {
        userId
      }
    });
  }

  async function findById(userId) {
    return UserDb.findByPk(userId);
  }

  return Object.freeze({
    findAll,
    findById,
    insert,
    update,
    remove
  });
}

module.exports = makeUsersDb;
