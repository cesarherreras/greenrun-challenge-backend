const { Strategy } = require('passport-local');
const UserService = require('./../../../services/user.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const service = new UserService();

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
  },
  async (username, password, done) => {
    try {
      const user = await service.findByEmail(username);
      if(!user) {
        done(boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch) {
        done(boom.unauthorized(), false);
      }
      //Everything is ok!
      delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      //Validation is not possible
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
