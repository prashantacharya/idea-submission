const User = require('../database/models/user');
const createError = require('../utils/createError');

const createUser = async (req, res, next) => {
  try {
    const user = await new User(req.body);
    await user.save();

    res.status(201).send({ status: 'Success', payload: user });
  } catch (error) {
    next(createError(400, error.message));
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
  } catch (error) {}
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send({
      status: 'Success',
      payload: users,
    });
  } catch (error) {
    next(error);
  }
};

const getUserByID = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.send({ status: 'Success', payload: user });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, getUsers, getUserByID };
