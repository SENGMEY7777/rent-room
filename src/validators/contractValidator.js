const Joi = require('joi');

const contractSchema = Joi.object({
  room_id: Joi.number().integer().required(),
  tenant_id: Joi.number().integer().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().greater(Joi.ref('start_date')).required(),
  monthly_rent: Joi.number().precision(2).required(),
  deposit_paid: Joi.number().precision(2).required()
});

module.exports = { contractSchema };