require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize').Sequelize;
const basename = path.basename(module.filename);
const db = {};

let sequelize = new Sequelize(
  process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT
  }
);

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const { Op } = require("sequelize");

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;

module.exports = db;