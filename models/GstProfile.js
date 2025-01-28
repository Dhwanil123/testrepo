const mongoose = require('mongoose');




const GstProfileSchema = new mongoose.Schema(
  {
    kid: { type: String, required: true, default: "" },
    gstin: { type: String, default: "" },
    address: { type: String, default: "" },
    aggregateTurnover: { type: String, default: "" },
    aggregateTurnovers: [
      {
        turnover: { type: String, default: "" },
        financialYear: { type: String, default: "" },
      },
    ],
    branches: [
      {
        address: { type: String, default: "" },
        email: { type: String, default: "" },
        emailDomain: { type: String, default: "" },
        contact: { type: String, default: "" },
        natureOfTrade: { type: String, default: "" },
        lastUpdatedDate: { type: Date, default: null },
      },
    ],
    dateOfRegistration: { type: Date, default: null },
    status: { type: String, default: "" },
    natureOfBusiness: { type: [String], default: [] },
    signatories: { type: [String], default: [] },
    signatoriesContact: [
      {
        name: { type: String, default: "" },
        email: { type: String, default: "" },
        emailDomain: { type: String, default: "" },
        contact: { type: String, default: "" },
      },
    ],
    filingFrequencies: [
      {
        financialYear: { type: String, default: "" },
        frequencies: [
          {
            quarter: { type: String, default: "" },
            preference: { type: String, default: "" },
          },
        ],
      },
    ],
    goodsDetails: [
      {
        hsnCode: { type: String, default: "" },
        hsn1: { type: String, default: "" },
        chapterCode: { type: String, default: "" },
        chapter: { type: String, default: "" },
        sectionCode: { type: String, default: "" },
        section: { type: String, default: "" },
        hsn2: { type: String, default: "" },
      },
    ],
    grossTotalIncomes: [
      {
        income: { type: String, default: "" },
        financialYear: { type: String, default: "" },
      },
    ],
    timestamp: { type: Date, default: null },
  },
  { timestamps: true }
);



module.exports = mongoose.model('GstProfile', GstProfileSchema);





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