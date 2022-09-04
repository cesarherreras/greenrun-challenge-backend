const Joi = require('joi');

const bets = Joi.array().items(
  Joi.object({
    userId: Joi.number().integer().required(),
    betId: Joi.number().integer().required(),
    amount: Joi.number().required(),
    state: Joi.string(),
    odd: Joi.number()
  })
)
const createUserBetSchema = Joi.object({
  bets: bets.required()
});

module.exports = { createUserBetSchema }
