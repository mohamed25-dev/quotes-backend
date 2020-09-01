const {setErrorResponse} = require('../common/response');
const logger = require('../startup/logging');

module.exports = function(err, req, res, next) {
    if(err.response) {
        logger.error(err.response.data);
    } else {
        logger.error(err);
    }
    console.log(err);
    
    if(err.name == 'SequelizeValidationError') {
        return setErrorResponse(res, 400, err.errors[0].message, err.errorCode);
    }

    if(err.name == 'SequelizeForeignKeyConstraintError') {
        return setErrorResponse(res, 400, 'This Item can\'t be deleted', 1015);
    }

    // if (err.code == 'ECONNREFUSED') {
    //     return setErrorResponse(res, 500, 'Connection to an API failed');
    // }
    														  																			
    if(err.name == 'SyntaxError') {
        return setErrorResponse(res, 401, 'Invalid JWT', 1013);
    }

    if(err.statusCode == 404) {
        return setErrorResponse(res, err.statusCode, err.message, 1003);
    }

    if(err.response) {
        if (err.response.data.message) {
            return setErrorResponse(res, err.response.status, err.response.data.message, err.errorCode);
        }
    }

    if(err.statusCode && err.message) {
        if(err.message.includes('is not allowed')) {
            err.errorCode = 1010;
        }

        if(err.message.includes('required')) {
            err.errorCode = 1011;
        }

        return setErrorResponse(res, err.statusCode, err.message, err.errorCode);
    }

    if(err.message == 'jwt expired') {
        err.errorCode = 1012;
        return setErrorResponse(res, 401, 'JWT Expired', err.errorCode);
    }
    
    if(err.name == 'JsonWebTokenError') {
        let message = 'Invalid JWT';
        err.errorCode = 1013;

        if(err.message == 'jwt expired') {
            message = 'JWT Expired';
        }
        return setErrorResponse(res, 401, message, err.errorCode);
    }

    return setErrorResponse(res, 500, 'Something went wrong, Please try again later', 1000);
}