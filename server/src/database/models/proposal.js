const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const proposalSchema = new Schema({
  title: { type: String, trim: true, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('proposal', proposalSchema);
