const User = require('../database/models/user');
const { createToken, verifyToken } = require('../utils/jwt');
const createError = require('../utils/createError');
const sendMail = require('../utils/mail');
const mail = require('../utils/html');
const bcrypt = require('bcrypt');

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

const resetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        status: 'Failed',
        message: 'User not found with provided email',
      });
    }
    const link = `Please Click the link below to reset your password \n http://${
      req.headers.host
    }/api/v1/user/reset/password/new/${await createToken({ id: user.email })}`;

    await sendMail({
      to: user.email,
      subject: 'Password reset link',
      html: mail(link),
    });
    res.status(200).send({ status: 'success', message: link });
  } catch (err) {
    next(err);
  }
};

const newPassword = async (req, res, next) => {
  try {
    if (req.body.password != req.body.confirmPassword) {
      return res
        .status(400)
        .send({ status: 'Failed', error: 'Password do not match' });
    }

    const decoded = verifyToken(req.params.token);

    if (!decoded)
      return res
        .status(400)
        .send({ status: 'Failed', error: 'No token found' });
    let user = await User.findOne({ email: decoded.id });

    user.password = req.body.password;
    await user.save();
    res.status(200).send({
      status: 'success',
      message: 'Your password has been successfully changed',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createUser,
  getUsers,
  getUserByID,
  resetPassword,
  newPassword,
};
