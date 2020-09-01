const Joi = require('joi');

exports.createValidate = function (permission) {
    const schema = {
        permissionName: Joi.string().required()
    };

    return Joi.validate(permission, schema);
}

exports.updateValidate = function (permission) {
    const schema = {
        permissionName: Joi.string().required()
    };

    return Joi.validate(permission, schema);
}    