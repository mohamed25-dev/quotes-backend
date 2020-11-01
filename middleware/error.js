const {error} = require('../common/response');
const logger = require('../startup/logging');
const AppExceptions = require('../common/errors/exceptions');

module.exports = function(err, req, res, next) {
    if(err.response) {
        logger.error(err.response.data);
    } else {
        logger.error(err);
    }
    console.log(err);
    
    if(err.name == 'SequelizeValidationError') {
        return error(res, err);
    }

    if(err.name == 'SequelizeForeignKeyConstraintError') {
        return error(res, err);
    }
    														  																			
    if(err.name == 'SyntaxError') {
        return error(res, err);
    }

    if(err.statusCode == 404) {
        return error(res, err);
    }

    if(err.response) {
        if (err.response.data.message) {
            return error(res, err);
        }
    }

    if(err.statusCode && err.message) {
        if(err.message.includes('is not allowed')) {
            err.errorCode = 1010;
        }

        if(err.message.includes('required')) {
            err.errorCode = 1011;
        }

        return error(res, err.statusCode, err.message, err.errorCode);
    }

    if(err.message == 'jwt expired') {
        return error(res, new AppExceptions.UnauthorizedException());
    }
    
    if(err.name == 'JsonWebTokenError') {
        return error(res, new AppExceptions.UnauthorizedException());
    }

    return error(res, err);
}