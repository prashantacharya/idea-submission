const { verifyToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
  const accessToken = req.headers.authorization.split(' ')[1];
  const decodedData = verifyToken(accessToken, process.env.ACCESSTOKEN_SECRET);
  if (decodedData) {
    res.locals.id = decodedData.id;
    res.locals.isAdmin = decodedData.isAdmin;
  }
  next();
};
