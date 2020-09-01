/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Permission = sequelize.define('permissions', {
      permissionId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      permissionName: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    }, {
      tableName: 'permissions',
      timestamps: false
    });
  
    Permission.associate = function (models) {
      // associations can be defined here
      Permission.belongsToMany(models.roles, {
        through: 'role_permissions',
        as: 'roles',
        foreignKey: 'permissionId',
      });
    };
  
    return Permission;
  };
  