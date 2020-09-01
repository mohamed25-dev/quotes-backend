const logger = require('../startup/logging');

exports.setResponse = function setResponse(res, statusCode, message, data) {
    result = {
        success: true,
        message: message.replace(/"/g, ''),
        data: data
    }

    return res.status(statusCode).send(result);
}

exports.setErrorResponse = function setErrorResponse(res, statusCode, errorMessage, errorCode) {
    logger.error(errorMessage);
    console.log(errorCode);
    result = {
        success: false,
        message: errorMessage.replace(/"/g, ''),
        errorCode: errorCode,
        data: []
    }
    
    return res.status(statusCode).send(result);
}