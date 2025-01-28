const mongoose = require('mongoose');

// const GstProfileSchema = new mongoose.Schema({
//   kid: { type: String, required: true },
//   name: { type: String, required: true },
//   city: { type: String, required: true },
//   gstin: { type: String },
//   address: { type: String },
//   aggregateTurnover: { type: String },
//   dateOfRegistration: { type: Date },
//   status: { type: String },
//   natureOfBusiness: [String],
//   signatories: [String],
// }, { timestamps: true });


const GstProfileSchema = new mongoose.Schema(
  {
    requestId: { type: String },
    kid: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    gstin: { type: String },
    address: { type: String },
    aggregateTurnover: { type: String },
    aggregateTurnovers: [
      {
        turnover: { type: String },
        financialYear: { type: String },
      },
    ],
    branches: [
      {
        address: { type: String },
        email: { type: String },
        emailDomain: { type: String },
        contact: { type: String },
        natureOfTrade: { type: String },
        lastUpdatedDate: { type: Date },
      },
    ],
    dateOfRegistration: { type: Date },
    status: { type: String },
    natureOfBusiness: [String],
    signatories: [String],
    signatoriesContact: [
      {
        name: { type: String },
        email: { type: String },
        emailDomain: { type: String },
        contact: { type: String },
      },
    ],
    filingFrequencies: [
      {
        financialYear: { type: String },
        frequencies: [
          {
            quarter: { type: String },
            preference: { type: String },
          },
        ],
      },
    ],
    goodsDetails: [
      {
        hsnCode: { type: String },
        hsn1: { type: String },
        chapterCode: { type: String },
        chapter: { type: String },
        sectionCode: { type: String },
        section: { type: String },
        hsn2: { type: String },
      },
    ],
    grossTotalIncomes: [
      {
        income: { type: String },
        financialYear: { type: String },
      },
    ],
    timestamp: { type: Date },
    complianceRating: { type: String },
  },
  { timestamps: true }
);


module.exports = mongoose.model('GstProfile', GstProfileSchema);
