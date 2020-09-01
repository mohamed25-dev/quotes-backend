const Joi = require('joi');

exports.validate = function (permission) {
    const schema = {
        permission: Joi.string().required()
    };

    return Joi.validate(permission, schema);
}
  