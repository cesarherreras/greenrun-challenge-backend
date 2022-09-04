const Joi = require('joi');

const userId = Joi.number().integer();
const amount = Joi.number();
const status = Joi.string();
const category = Joi.string();

const createTransactionSchema = Joi.object({
  userId: userId.required(),
  amount: amount.required(),
  status
});

const getTransactionSchema = Joi.object({
  category,
  userId
});

const getUserTransactionSchema = Joi.object({
  userId: userId.required()
});

module.exports = { createTransactionSchema, getTransactionSchema, getUserTransactionSchema }
