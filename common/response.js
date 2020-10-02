const logger = require('../startup/logging');
const ApplicationException = require('./errors/app_error');

exports.success = (res, obj = null) => {
  if (obj) {
    res.status(obj.code || 200).send(obj.body);
  } else {
    res.status(200).send();
  }
};

exports.error = (res, error) => {
  if (typeof (error) === 'object' && error instanceof ApplicationException) {
    logger.warn(error);
    res.status(error.status).send({
      code: error.code,
      message: error.message,
    })
  } else {
    logger.error(error);
    res.status(error.code || 500).send({
      code: error.code || 500,
      message: error.message
    });
  }
};
