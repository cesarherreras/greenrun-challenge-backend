const express = require('express');
const passport = require('passport');

const BetService = require('./../services/bet.service');
const { checkRoles } = require('./../middlewares/auth.handler');
const validatorHandler = require('./../middlewares/validator.handler');
const { getBetSchema, updateBetSchema } = require('./../schemas/bet.schema');

const router = express.Router();
const service = new BetService();

//Get the list of users
router.get('/',
  validatorHandler(getBetSchema, 'query'),
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  async (req, res, next) => {
  try {
    const params = req.query;
    const bets = await service.find(params);
    res.json(bets);
  } catch (error) {
    next(error);
  }
});

//Update bets result to settled
router.patch('/settled',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(updateBetSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const rta = await service.settledBet(body);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

// Update bets
router.patch('/update',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(updateBetSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const rta = await service.update(body);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
