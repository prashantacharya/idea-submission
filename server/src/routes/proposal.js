const express = require('express');
const {
  getAllProposals,
  getProposal,
  createProposal,
  deleteProposal,
  editProposal,
  approveProposal,
  rejectProposal,
} = require('../controllers/proposal');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, getAllProposals);
router.get('/:id', auth, getProposal);
router.post('/create', auth, createProposal);
router.delete('/delete/:id', auth, deleteProposal);
router.patch('/edit/:id', auth, editProposal);
router.patch('/approve/:id', auth, approveProposal);
router.patch('/reject/:id', auth, rejectProposal);

module.exports = router;
