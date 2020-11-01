const i18n = require('i18n');
const ApplicationException = require('./app_error');

class ServerException extends ApplicationException {
  constructor(message) {
    super(message || 'Server error', 500);
  }
}

class InvalidInputException extends ApplicationException {
  constructor(message) {
    super(message || 'Invalid input', 400);
  }
}

class UnauthorizedException extends ApplicationException {
  constructor(message) {
    super(message || 'Unauthorized', 401);
  }
}

class NotFoundException extends ApplicationException {
  constructor(message) {
    super(message || 'Not found', 404);
  }
}

class InvalidUserIdException extends ApplicationException {
  constructor(message) {
    super(message || 'Invalid user id', 400);
  }
}

class BlockedUserException extends ApplicationException {
  constructor(message) {
    super(message || i18n.__('Account is blocked'), 403);
  }
}

module.exports = {
  ServerException: ServerException,
  InvalidInputException: InvalidInputException,
  UnauthorizedException: UnauthorizedException,
  NotFoundException: NotFoundException,
  InvalidUserIdException: InvalidUserIdException,
  BlockedUserException: BlockedUserException,
};
