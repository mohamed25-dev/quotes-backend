/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Role = sequelize.define('roles', {
    roleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    roleName: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'roles',
    timestamps: false
  });

  Role.associate = function (models) {
    // associations can be defined here
    Role.belongsToMany(models.users, {
      through: 'user_roles',
      as: 'users',
      foreignKey: 'roleId',
    });

    Role.belongsToMany(models.permissions, {
      through: 'role_permissions',
      as: 'permissions',
      foreignKey: 'roleId',
    });
  };

  return Role;
};
