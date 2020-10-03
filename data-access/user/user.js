const makeUsersDb = function (UserDb, RoleDb, PermissionDb, Op) {
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

  async function findByUsername(username) {
    const include = [{
      model: RoleDb,
      as: 'roles',
      attributes: ['roleId', 'roleName'],
      through: {
        attributes: []
      },
      include: [{
        model: PermissionDb,
        as: 'permissions',
        attributes: ['permissionId', 'permissionName'],
        through: {
          attributes: []
        }
      }]
    }];

    return UserDb.findOne({
      where: {
        username
      },
      include: include
    });
  }

  async function findByUsernameExceptId(userId, username) {
    return UserDb.findOne({
      where: {
        username,
        userId: {
          [Op.ne]: userId
        }
      }
    });

  }

  async function setRoles(roles) {
    await UserDb.removeRoles(await UserDb.getRoles());
    return UserDb.setRoles(roles);
  }

  return Object.freeze({
    findAll,
    findById,
    insert,
    update,
    remove,
    findByUsername,
    findByUsernameExceptId,
    setRoles
  });
}

module.exports = makeUsersDb;
