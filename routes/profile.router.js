const express = require('express');
const passport = require('passport');
const UserService = require('../services/user.service');
const TransactionService = require('../services/transaction.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { updateUserSchema } = require('./../schemas/user.schema');
const { createTransactionSchema, getTransactionSchema } = require('./../schemas/transaction.schema');
const { checkRoles } = require('./../middlewares/auth.handler');

const router = express.Router();
const userService = new UserService();
const transactionService = new TransactionService();

//Obtain user transactions list
router.get('/my-transactions',
  passport.authenticate('jwt', {session: false}),
  checkRoles('user'),
  validatorHandler(getTransactionSchema, 'query'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const params = req.query;
      const transactions = await transactionService.getTransactions(user.sub, params);
      res.json(transactions);
    } catch (error) {
      next(error);
    }
  }
);

//Make a deposit
router.post('/deposit',
  passport.authenticate('jwt', {session: false}),
  checkRoles('user'),
  validatorHandler(createTransactionSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const user = req.user;
      const deposit = await transactionService.createDeposit(user.sub, data);
      res.json(deposit);
    } catch (error) {
      next(error);
    }
  }
);

//Make a withdraw
router.post('/withdraw',
  passport.authenticate('jwt', {session: false}),
  checkRoles('user'),
  validatorHandler(createTransactionSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const user = req.user;
      const withdraw = await transactionService.createWithdraw(user.sub, data);
      res.json(withdraw);
    } catch (error) {
      next(error);
    }
  }
);

//Update user-profile information
router.patch('/update',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const changes = req.body;
      const userUpdated = await userService.updateProfile(user.sub, changes)
      res.json(userUpdated);
    } catch (error) {
      next(error);
    }
});

module.exports = router;
