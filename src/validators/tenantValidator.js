const Joi = require('joi');

const tenantCreateSchema = Joi.object({
    name: Joi.string().min(2).max(128).required(),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(128),
    price: Joi.number().positive(),
    stock: Joi.number().integer().min(0),
    description: Joi.string().allow('', null),
    category_id: Joi.string(),
}).unknown(true);

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: error.details.map((d) => d.message),
        });
    }
    next();
};

module.exports = {
    schema: tenantCreateSchema,
    validate,
};
