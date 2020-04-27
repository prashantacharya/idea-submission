const express = require('express');
const {
  getAllProposals,
  getProposal,
  createProposal,
  deleteProposal,
  editProposal,
} = require('../controllers/proposal');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, getAllProposals);
router.get('/:id', auth, getProposal);
router.post('/create', auth, createProposal);
router.delete('/delete/:id', auth, deleteProposal);
router.patch('/edit/:id', auth, editProposal);

module.exports = router;
