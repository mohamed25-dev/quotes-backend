const db = require('../models/index');
const logger = require('../startup/logging');

db.sequelize.sync({alter: true}).then(()=>{
    console.log('database is ready to work');
    logger.info('db is ready');
});

