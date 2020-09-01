const Joi = require('joi');

exports.createValidate = function (user) {
    const schema = {
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
        fullName: Joi.string().required(),
        type: Joi.string().required(),
        rolesIds: Joi.array(),
        isEnabled: Joi.bool()
    };

    return Joi.validate(user, schema);
}

exports.updateValidate = function (user) {
    const schema = {
        username: Joi.string(),
        password: Joi.string().min(6),
        fullName: Joi.string(),
        type: Joi.string(),
        rolesIds: Joi.array(),
        isEnabled: Joi.bool(),
    };

    return Joi.validate(user, schema);
}    

exports.loginValidate = function (user) {
    const schema = {
        username: Joi.string().required(),
        password: Joi.string().required(),
    };

    return Joi.validate(user, schema);
}

exports.resetPasswordValidate = function (user) {
    const schema = {
        password: Joi.string().required()
    };

    return Joi.validate(user, schema);
}
