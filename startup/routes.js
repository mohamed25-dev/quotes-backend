const rateLimit = require('express-rate-limit');
const helmet    = require('helmet');
const express   = require('express');
const error     = require('../middleware/error');
const path      = require('path');

const users  = require('../routes/users');
const roles  = require('../routes/roles');
const quotes = require('../routes/quotes');
const authors = require('../routes/authors');
const permissions  = require('../routes/permissions');
const authenticate = require('../routes/authenticate');
const publicPath = path.join(__dirname, '..', './public');

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin, Authorization');
    next();
}

const limiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes for more than 15 tries
    max: 15,
    skipSuccessfulRequests: true
});

module.exports = function (app) {
    app.use(allowCrossDomain);
    app.use(express.json());
    app.use(helmet());
    app.use('/users/login/', limiter);
    app.use(express.static(publicPath));

    //Reall Routes
    app.use(users);
    app.use(roles);
    app.use(permissions);
    app.use(authenticate);
    app.use(quotes);
    app.use(authors);
    app.use(error);

    app.use('/', (req, res) => {
        res.status(404).send('Invalid URL, API Not found');
    });
}