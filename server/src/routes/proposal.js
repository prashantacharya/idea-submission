const express = require('express');
const {
  getAllProposals,
  getProposal,
  createProposal,
  deleteProposal,
  editProposal,
} = require('../controllers/proposal');

const router = express.Router();

router.get('/', getAllProposals);
router.get('/:id', getProposal);
router.post('/create', createProposal);
router.delete('/delete/:id', deleteProposal);
router.patch('/edit/:id', editProposal);

module.exports = router;
