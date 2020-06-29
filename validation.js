const Joi = require('@hapi/joi');

// Register validation
const registerValidation = (data) => {

    const registerSchema = Joi.object({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
    });

    return registerSchema.validate(data);

}

// Login validation
const loginValidation = (data) => {

    const loginSchema = Joi.object({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
    });

    return loginSchema.validate(data);

}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
