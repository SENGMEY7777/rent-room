const Joi = require('joi');

const roomSchema = Joi.object({
  room_number: Joi.string().required(),
  floor: Joi.number().integer().required(),
  room_type: Joi.string().valid('single', 'double', 'studio', 'one_bedroom').required(),
  price_per_month: Joi.number().precision(2).required(),
  deposit_amount: Joi.number().precision(2).required(),
  status: Joi.string().valid('available', 'occupied', 'maintenance').optional(),
  description: Joi.string().optional()
});

module.exports = { roomSchema };