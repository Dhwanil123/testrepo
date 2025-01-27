const mongoose = require('mongoose');

const GstProfileSchema = new mongoose.Schema({
  kid: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  gstin: { type: String },
  address: { type: String },
  aggregateTurnover: { type: String },
  dateOfRegistration: { type: Date },
  status: { type: String },
  natureOfBusiness: [String],
  signatories: [String],
}, { timestamps: true });

module.exports = mongoose.model('GstProfile', GstProfileSchema);
