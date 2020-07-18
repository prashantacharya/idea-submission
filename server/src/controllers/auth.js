const bcrypt = require('bcrypt');
const createError = require('../utils/createError');
const User = require('../database/models/user');
const { createToken, verifyToken } = require('../utils/jwt');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw createError(401, "Email or password doesn't match");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const accessToken = await createToken(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.ACCESSTOKEN_SECRET
      );

      const refreshToken = await createToken(
        { id: user._id },
        process.env.REFRESHTOKEN_SECRET,
        '7 days',
        'refresh'
      );

      res.send({ status: 'Success', accessToken, refreshToken, payload: user });
    } else {
      throw createError(401, "Email or password doesn't match");
    }
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  const decodedInfo = verifyToken(
    req.body.refreshToken,
    process.env.REFRESHTOKEN_SECRET
  );

  const user = await User.findById(decodedInfo.id);
  const accessToken = await createToken(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.ACCESSTOKEN_SECRET
  );

  res.send({ status: 'Success', payload: { accessToken } });
};

module.exports = { login, refreshToken };
