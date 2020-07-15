const jwt = require('jsonwebtoken');
const token = require('../database/models/token');
const createError = require('../utils/createError');

const createToken = async (payload, secret = process.env.ACCESSTOKEN_SECRET, expiry = '1h', type = 'access') => {
  const tok = jwt.sign(payload, secret, { expiresIn: expiry });

  if (type === 'refresh') {
    try {
      const refreshToken = await new token({ token: tok });
      await refreshToken.save();
    } catch (error) {
      throw error;
    }
  }
  return tok;
};

const verifyToken = (token, secret = process.env.ACCESSTOKEN_SECRET) => {
  try {
    token = token.toString();
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError')
      throw createError(401, 'Token Expired');

    throw error;
  }
};

module.exports = { createToken, verifyToken };
