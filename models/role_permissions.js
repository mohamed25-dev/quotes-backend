/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const RolePermission = sequelize.define('role_permissions', {
      roleId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'roles',
          key: 'roleid'
        }
      },
      permissionId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'permissions',
          key: 'permissionid'
        }
      },
    }, {
      tableName: 'role_permissions',
      timestamps: false
    });

    return RolePermission;
  };
  