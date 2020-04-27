const express = require('express');
const router = express.Router();

const { getUsers, getUserByID } = require('../controllers/user');

router.get('/all', getUsers);
router.get('/:id', getUserByID);

module.exports = router;
