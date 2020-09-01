/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('users', {
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    isEnabled: {
      type: DataTypes.INTEGER(11),
      defaultValue: false
    }
  }, {
    tableName: 'users'
  });

  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.roles, {
      through: 'user_roles',
      as: 'roles',
      foreignKey: 'userId',
    });
  }

  return User;
};
