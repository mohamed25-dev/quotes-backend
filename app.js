const express = require('express');
const dotenv  = require('dotenv');
dotenv.config();

const port = process.env.SERVER_PORT;
const app  = express();

//startup
const logger = require('./startup/logging');
require('./startup/routes')(app);


app.listen(port, '0.0.0.0',() => {
    console.log(`listening on port ${port}`);
    logger.info(`listening on port ${port}`)
});

