const Joi = require('joi');

const id = Joi.array().items(Joi.number().integer());
const sport = Joi.string();
const eventId = Joi.string();
const status = Joi.string();
const result = Joi.string();

const updateBetSchema = Joi.object({
  id: id.required(),
  status,
  result
});

const getBetSchema = Joi.object({
  sport,
  eventId
});

module.exports = { getBetSchema, updateBetSchema }
