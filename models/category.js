/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Category = sequelize.define('categories', {
      categoryId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      categoryName: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      categoryImage: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      isEnabled: {
        type: DataTypes.INTEGER(11),
        defaultValue: false
      }
    }, {
      tableName: 'categories',
      timestamps: false
    });
  
    return Category;
  };
  