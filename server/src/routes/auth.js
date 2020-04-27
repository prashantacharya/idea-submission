const express = require('express');
const { createUser } = require('../controllers/user');
const { login, refreshToken } = require('../controllers/auth');

const router = express.Router();

router.post('/create', createUser);
router.post('/login', login);
router.post('/token', refreshToken);

module.exports = router;
