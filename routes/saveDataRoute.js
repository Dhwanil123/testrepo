const express = require('express');
const axios = require('axios');
const GstProfile = require('../models/GstProfile');
const EpfDetail = require('../models/EpfDetail');

const router = express.Router();

router.post('/save-data', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'id is required' });
  }

  try {
    // Fetch GST Profile Data
    const gstResponse = await axios.post(
      'https://api.karza.in/kscan/test/v3/gst-profile',
      { id },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-karza-key': process.env.KARZA_API_KEY,
        },
      }
    );

    const gstResult = gstResponse.data.result[0];

    const gstProfileData = {
      kid: id || "",
      gstin: gstResult.gstin || "",
      address: gstResult.address || "",
      aggregateTurnover: gstResult.aggregateTurnover || "",
      aggregateTurnovers: gstResult.aggregateTurnovers || [],
      branches: gstResult.branches || [],
      dateOfRegistration: gstResult.dateOfRegistration || null,
      status: gstResult.status || "",
      natureOfBusiness: gstResult.natureOfBusiness || [],
      signatories: gstResult.signatories || [],
      signatoriesContact: gstResult.signatoriesContact || [],
      filingFrequencies: gstResult.filingFrequencies || [],
      goodsDetails: gstResult.goodsDetails || [],
      grossTotalIncomes: gstResult.grossTotalIncomes || [],
      timestamp: gstResult.timestamp || null,
    };

    // Save GST Profile Data to MongoDB
    const gstProfile = new GstProfile(gstProfileData);
    await gstProfile.save();

    // Fetch EPF Details Data
    const epfResponse = await axios.post(
      'https://api.karza.in/kscan/test/v3/epf-details',
      { id },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-karza-key': process.env.KARZA_API_KEY,
        },
      }
    );

    const epfResult = epfResponse.data.result[0];

    const epfDetailData = {
      kid: id || "",
      address: epfResult.address || "",
      addressProof: epfResult.addressProof || "",
      branchesWithoutCode: epfResult.branchesWithoutCode || [],
      contact: epfResult.contact || "",
      country: epfResult.country || "",
      coverageSection: epfResult.coverageSection || "",
      dateOfCoverage: epfResult.dateOfCoverage || null,
      dateOfIncorporation: epfResult.dateOfIncorporation || null,
      district: epfResult.district || "",
      ecrRegistrationStatus: epfResult.ecrRegistrationStatus || "",
      email: epfResult.email || "",
      emailDomain: epfResult.emailDomain || "",
      employeeCounts: epfResult.employeeCounts || [],
      epfoOfficeAddress: epfResult.epfoOfficeAddress || "",
      epfoOfficeCode_: epfResult.epfoOfficeCode_ || "",
      epfoOfficeName: epfResult.epfoOfficeName || "",
      epfoRegion: epfResult.epfoRegion || "",
      epfoZone: epfResult.epfoZone || "",
      esicCode: epfResult.esicCode || null,
      establishmentMembers: epfResult.establishmentMembers || null,
      establishmentNumber_: epfResult.establishmentNumber_ || "",
      establishmentsWithSamePan: epfResult.establishmentsWithSamePan || [],
      exemptionStatus: epfResult.exemptionStatus || "",
      factoryDetails: epfResult.factoryDetails || [],
      fax: epfResult.fax || null,
      fullAddress_: epfResult.fullAddress_ || "",
      isAddressQualityPoor_: epfResult.isAddressQualityPoor_ || null,
      isCinCorrespondsToEstablishment_: epfResult.isCinCorrespondsToEstablishment_ || false,
      isDomainInvalid_: epfResult.isDomainInvalid_ || null,
      isEmailDisposable_: epfResult.isEmailDisposable_ || null,
      isEmailInvalid_: epfResult.isEmailInvalid_ || null,
      isEpfClosed: epfResult.isEpfClosed || null,
      isEpfRegisteredWithBifr: epfResult.isEpfRegisteredWithBifr || null,
      isEpfTransactionDefault: epfResult.isEpfTransactionDefault || false,
      isEpfTransactionDelay: epfResult.isEpfTransactionDelay || false,
      isEpfUnderLiquidation: epfResult.isEpfUnderLiquidation || null,
      isPanCorrespondsToEstablishment_: epfResult.isPanCorrespondsToEstablishment_ || false,
      laborIdentificationNumber: epfResult.laborIdentificationNumber || null,
      lastUpdatedOn: epfResult.lastUpdatedOn || null,
      mcaEntityId: epfResult.mcaEntityId || "",
      msmeOrderDate: epfResult.msmeOrderDate || null,
      msmeOrderNumber: epfResult.msmeOrderNumber || null,
      nameAsPerPan: epfResult.nameAsPerPan || "",
      otherCodesWithSameEstablishment: epfResult.otherCodesWithSameEstablishment || [],
      ownershipType: epfResult.ownershipType || "",
      pan: epfResult.pan || "",
      panStatus: epfResult.panStatus || "",
      pincode: epfResult.pincode || "",
      postCoverageStatus: epfResult.postCoverageStatus || null,
      primaryBusinessActivity: epfResult.primaryBusinessActivity || "",
      primaryEstablishmentId_: epfResult.primaryEstablishmentId_ || "",
      sectionApplicable: epfResult.sectionApplicable || "",
      sourceUri: epfResult.sourceUri || null,
      startupOrderDate: epfResult.startupOrderDate || null,
      startupOrderNumber: epfResult.startupOrderNumber || null,
      state: epfResult.state || "",
      stateCode_: epfResult.stateCode_ || "",
      status: epfResult.status || "",
      stockKeepingUnits: epfResult.stockKeepingUnits || [],
      subEstablishmentNumber_: epfResult.subEstablishmentNumber_ || "",
      transactionAmounts: epfResult.transactionAmounts || [],
      transactionDefaults: epfResult.transactionDefaults || [],
      transactionDelays: epfResult.transactionDelays || [],
      unitsUnderSameJurisdiction: epfResult.unitsUnderSameJurisdiction || [],
      website: epfResult.website || null,
      websiteDomain: epfResult.websiteDomain || null,
      workingStatus: epfResult.workingStatus || "",
      timestamp: epfResult.timestamp || null,
    };

    // Save EPF Details Data to MongoDB
    const epfDetail = new EpfDetail(epfDetailData);
    await epfDetail.save();

    res.status(201).json({
      message: 'Data saved successfully',
      gstProfile: gstProfile,
      epfDetail: epfDetail,
    });
  } catch (error) {
    console.error('Error fetching data or saving:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
