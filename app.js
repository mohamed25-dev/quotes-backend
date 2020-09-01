const express = require('express');
const config  = require('config');

const port = config.get('port') || 3000;
const app  = express();

//startup
const logger = require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db');


app.listen(port, '0.0.0.0',() => {
    console.log(`listening on port ${port}`);
    logger.info(`listening on port ${port}`)
});

