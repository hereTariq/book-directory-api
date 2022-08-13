const Joi = require('joi');

exports.signupValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
    });

    return schema.validate(data);
};

exports.loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
    });

    return schema.validate(data);
};

exports.bookValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().min(4).required(),
    });

    return schema.validate(data);
};
