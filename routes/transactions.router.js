const express = require('express');
const passport = require('passport');

const TransactionService = require('./../services/transaction.service');
const { checkRoles } = require('./../middlewares/auth.handler');
const validatorHandler = require('./../middlewares/validator.handler');
const { getTransactionSchema, getUserTransactionSchema } = require('./../schemas/transaction.schema');

const router = express.Router();
const service = new TransactionService();

//Get the list of transactions
router.get('/',
  validatorHandler(getTransactionSchema, 'query'),
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  async (req, res, next) => {
  try {
    const params = req.query;
    const transactions = await service.adminGetTransactions(params);
    res.json(transactions);
  } catch (error) {
    next(error);
  }
});

//Get user by id (Filter to calculate balance)
router.get('/:userId',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getUserTransactionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const userBalance = await service.getBalance(userId);
      res.json(userBalance);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
