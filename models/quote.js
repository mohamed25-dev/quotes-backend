/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Quote = sequelize.define('quotes', {
      quoteId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      quote: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      categoryId: {
        type: DataTypes.INTEGER(45),
        allowNull: false
      },
      authorId: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      }
    }, {
      tableName: 'quotes',
      timestamps: false
    });
  
    Quote.associate = function (models) {
      // associations can be defined here
      Quote.belongsTo(models.categories, {
        foreignKey: 'categoryId',
        as: 'category'
      });

      Quote.belongsTo(models.authors, {
        foreignKey: 'authorId',
        as: 'author'
      });
    }
  
    return Quote;
  };
  