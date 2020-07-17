const express = require('express');

const router = express.Router();

const {
  getUsers,
  getUserByID,
  resetPassword,
  newPassword,
} = require('../controllers/user');

router.get('/all', getUsers);
router.get('/:id', getUserByID);
router.post('/reset/password', resetPassword);
router.post('/reset/password/new/:token', newPassword);

module.exports = router;
