const express = require('express');
const axios = require('axios');
const EpfDetail = require('../models/EpfDetail');

const router = express.Router();

// POST endpoint to save GST profile
router.post('/save-detail', async (req, res) => {
  const { id } = req.body;

  if (!id ) {
    return res.status(400).json({ error: 'id is required' });
  }

  try {
    // Fetch data from Karza API
    const response = await axios.post(
      'https://api.karza.in/kscan/test/v3/epf-details',
      { id },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-karza-key': process.env.KARZA_API_KEY,
        },
      }
    );

    const result = response.data.result[0];
   


    const detailData = {
  kid: id || "",
  gstin: result.gstin || "",
  address: result.address || "",
  addressProof: result.addressProof || "",
  branchesWithoutCode: result.branchesWithoutCode || [],
  contact: result.contact || "",
  country: result.country || "",
  coverageSection: result.coverageSection || "",
  dateOfCoverage: result.dateOfCoverage || null,
  dateOfIncorporation: result.dateOfIncorporation || null,
  district: result.district || "",
  ecrRegistrationStatus: result.ecrRegistrationStatus || "",
  email: result.email || "",
  emailDomain: result.emailDomain || "",
  employeeCounts: result.employeeCounts || [],
  epfoOfficeAddress: result.epfoOfficeAddress || "",
  epfoOfficeCode_: result.epfoOfficeCode_ || "",
  epfoOfficeName: result.epfoOfficeName || "",
  epfoRegion: result.epfoRegion || "",
  epfoZone: result.epfoZone || "",
  esicCode: result.esicCode || null,
  establishmentMembers: result.establishmentMembers || null,
  establishmentNumber_: result.establishmentNumber_ || "",
  establishmentsWithSamePan: result.establishmentsWithSamePan || [],
  exemptionStatus: result.exemptionStatus || "",
  factoryDetails: result.factoryDetails || [],
  fax: result.fax || null,
  fullAddress_: result.fullAddress_ || "",
  isAddressQualityPoor_: result.isAddressQualityPoor_ || null,
  isCinCorrespondsToEstablishment_: result.isCinCorrespondsToEstablishment_ || false,
  isDomainInvalid_: result.isDomainInvalid_ || null,
  isEmailDisposable_: result.isEmailDisposable_ || null,
  isEmailInvalid_: result.isEmailInvalid_ || null,
  isEpfClosed: result.isEpfClosed || null,
  isEpfRegisteredWithBifr: result.isEpfRegisteredWithBifr || null,
  isEpfTransactionDefault: result.isEpfTransactionDefault || false,
  isEpfTransactionDelay: result.isEpfTransactionDelay || false,
  isEpfUnderLiquidation: result.isEpfUnderLiquidation || null,
  isPanCorrespondsToEstablishment_: result.isPanCorrespondsToEstablishment_ || false,
  laborIdentificationNumber: result.laborIdentificationNumber || null,
  lastUpdatedOn: result.lastUpdatedOn || null,
  mcaEntityId: result.mcaEntityId || "",
  msmeOrderDate: result.msmeOrderDate || null,
  msmeOrderNumber: result.msmeOrderNumber || null,
  nameAsPerPan: result.nameAsPerPan || "",
  otherCodesWithSameEstablishment: result.otherCodesWithSameEstablishment || [],
  ownershipType: result.ownershipType || "",
  pan: result.pan || "",
  panStatus: result.panStatus || "",
  pincode: result.pincode || "",
  postCoverageStatus: result.postCoverageStatus || null,
  primaryBusinessActivity: result.primaryBusinessActivity || "",
  primaryEstablishmentId_: result.primaryEstablishmentId_ || "",
  sectionApplicable: result.sectionApplicable || "",
  sourceUri: result.sourceUri || null,
  startupOrderDate: result.startupOrderDate || null,
  startupOrderNumber: result.startupOrderNumber || null,
  state: result.state || "",
  stateCode_: result.stateCode_ || "",
  status: result.status || "",
  stockKeepingUnits: result.stockKeepingUnits || [],
  subEstablishmentNumber_: result.subEstablishmentNumber_ || "",
  transactionAmounts: result.transactionAmounts || [],
  transactionDefaults: result.transactionDefaults || [],
  transactionDelays: result.transactionDelays || [],
  unitsUnderSameJurisdiction: result.unitsUnderSameJurisdiction || [],
  website: result.website || null,
  websiteDomain: result.websiteDomain || null,
  workingStatus: result.workingStatus || "",
  timestamp: result.timestamp || null,
};


    // Save to MongoDB
    const epfDetail = new EpfDetail(detailData);
    await epfDetail.save();

    res.status(201).json({ message: 'Data saved successfully', data: epfDetail });
  } catch (error) {
    console.error('Error fetching data or saving profile:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;