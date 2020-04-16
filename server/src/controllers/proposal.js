const Proposal = require('../database/models/proposal');

const getAllProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find();
    res.send(proposals);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    res.send(proposal);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const createProposal = async (req, res) => {
  try {
    const proposal = new Proposal(req.body);
    await proposal.save();

    res.status(201).send(saveProposal);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteProposal = async (req, res) => {
  try {
    const deletedProposal = await Proposal.findByIdAndDelete(req.params.id);

    res.send(deletedProposal);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const editProposal = async (req, res) => {
  try {
    const editedProposal = await Proposal.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.status(202).send(editedProposal);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  getAllProposals,
  getProposal,
  createProposal,
  deleteProposal,
  editProposal,
};
