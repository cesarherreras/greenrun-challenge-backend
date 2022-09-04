const express = require('express');

const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');
const transactionsRouter = require('./transactions.router');
const betsRouter = require('./bets.router');
const usersBetsRouter = require('./bets-users.router');


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
  router.use('/transactions', transactionsRouter);
  router.use('/bets', betsRouter);
  router.use('/usersbets', usersBetsRouter);

}

module.exports = routerApi;
