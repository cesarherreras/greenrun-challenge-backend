const express = require('express');
const passport = require('passport');

const UserBetService = require('./../services/bet-user.service');
const { checkRoles } = require('./../middlewares/auth.handler');
const validatorHandler = require('./../middlewares/validator.handler');
const { createUserBetSchema } = require('./../schemas/bet-user.schema');

const router = express.Router();
const service = new UserBetService();

//Create a user-bet
router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('user'),
  validatorHandler(createUserBetSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newuserbet = await service.create(body);
      res.status(201).json(newuserbet);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
