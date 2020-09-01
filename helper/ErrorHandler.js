class ErrorHandler extends Error {
    constructor(statusCode, message, errorCode = 1001) {
        super();
        this.statusCode = statusCode;
        this.message    = message;
        this.errorCode  = errorCode;
    }
}

module.exports = {
    ErrorHandler
}