const User = require('../database/models/user');

const createUser = async (req, res) => {
  try {
    const user = await new User(req.body);
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

// const getUser

module.exports = { createUser };
