const Joi = require('joi');

exports.createValidate = function (role) {
    const schema = {
        roleName: Joi.string().required(),
        permissionsIds: Joi.array()
    };

    return Joi.validate(role, schema);
}

exports.updateValidate = function (role) {
    const schema = {
        roleName: Joi.string(),
        permissionsIds: Joi.array()
    };

    return Joi.validate(role, schema);
}    