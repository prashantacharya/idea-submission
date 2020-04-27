const Proposal = require('../database/models/proposal');
const createError = require('../utils/createError');

const getAllProposals = async (req, res, next) => {
  console.log(res.locals);
  try {
    const proposals = await Proposal.find();
    res.send({ status: 'Success', payload: proposals });
  } catch (error) {
    next(error);
  }
};

const getProposal = async (req, res, next) => {
  try {
    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      throw createError(404, 'Proposal not found');
    }

    res.send({ status: 'Success', payload: proposal });
  } catch (error) {
    next(error);
  }
};

const createProposal = async (req, res, next) => {
  try {
    const proposal = new Proposal({ ...req.body, submittedBy: res.locals.id });
    await proposal.save();

    res.status(201).send({ status: 'Success', payload: proposal });
  } catch (error) {
    if (error.name === 'ValidationError') error.status = 400;
    next(error);
  }
};

const deleteProposal = async (req, res, next) => {
  try {
    const deletedProposal = await Proposal.findOneAndDelete({
      _id: req.params.id,
      submittedBy: res.locals.id,
    });

    if (!deletedProposal) {
      throw createError(404, 'Proposal not found');
    }

    res.send(deletedProposal);
  } catch (error) {
    next(error);
  }
};

const editProposal = async (req, res, next) => {
  try {
    const editProposal = await Proposal.findOneAndUpdate(
      {
        _id: req.params.id,
        submittedBy: res.locals.id,
      },
      req.body
    );

    if (!editProposal) throw createError(404, 'Proposal not found');

    const updatedProposal = await Proposal.findById(req.params.id);

    res.status(202).send({ status: 'Success', payload: updatedProposal });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProposals,
  getProposal,
  createProposal,
  deleteProposal,
  editProposal,
};
