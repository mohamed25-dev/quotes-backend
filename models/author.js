/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Author = sequelize.define('authors', {
      authorId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      fullName: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      authorImage: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      isEnabled: {
        type: DataTypes.INTEGER(11),
        defaultValue: false
      }
    }, {
      tableName: 'authors',
      timestamps: false
    });
  
    return Author;
  };
  