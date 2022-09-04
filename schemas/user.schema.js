const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const userName = Joi.string().min(5);
const role = Joi.string();
const firstName = Joi.string();
const lastName = Joi.string();
const country = Joi.string();
const city = Joi.string();
const documentId = Joi.string();
const userState = Joi.string();
const category = Joi.string();
const deleted = Joi.boolean();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
  userName: userName,
  firstName: firstName,
  lastName: lastName,
  country: country,
  city: city,
  documentId: documentId
});

const updateUserSchema = Joi.object({
  email: email,
  role: role,
  password: password,
  userName: userName,
  userState: userState,
  category: category,
  deleted: deleted,
  firstName: firstName,
  lastName: lastName,
  country: country,
  city: city,
  documentId: documentId
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
