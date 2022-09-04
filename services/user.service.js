const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll();
    return rta;
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email }
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async adminUpdate(id, changes, actualUser) {
    const user = await this.findOne(id);
    if (user.role === 'admin' && user.id != actualUser.sub){
      throw boom.unauthorized('Admin information is not modifiable');
    }
    const rta = await user.update(changes);
    return rta;
  }

  async updateProfile(id, changes) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    if (changes.password) {
      changes.password = await bcrypt.hash(changes.password, 10);
    }
    const rta = await user.update(changes);
    return rta;
  }
}

module.exports = UserService;
