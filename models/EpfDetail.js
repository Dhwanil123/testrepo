const mongoose = require('mongoose');




const EpfDetailSchema = new mongoose.Schema(
    {
      kid: { type: String, required: true, default: "" },
      address: { type: String, default: "" },
      actionableStatus: { type: String, default: "" },
      addressProof: { type: String, default: "" },
      branchesWithoutCode: { type: [String], default: [] },
      contact: { type: String, default: "" },
      country: { type: String, default: "" },
      coverageSection: { type: String, default: "" },
      dateOfCoverage: { type: Date, default: null },
      dateOfIncorporation: { type: Date, default: null },
      district: { type: String, default: "" },
      ecrRegistrationStatus: { type: String, default: "" },
      email: { type: String, default: "" },
      emailDomain: { type: String, default: "" },
      employeeCounts: { type: [String], default: [] },
      epfoOfficeAddress: { type: String, default: "" },
      epfoOfficeCode_: { type: String, default: "" },
      epfoOfficeName: { type: String, default: "" },
      epfoRegion: { type: String, default: "" },
      epfoZone: { type: String, default: "" },
      esicCode: { type: String, default: null },
      establishmentMembers: { type: String, default: null },
      establishmentNumber_: { type: String, default: "" },
      establishmentsWithSamePan: [
        {
          establishmentId: { type: String, default: "" },
          primaryEstablishmentId_: { type: String, default: "" },
          establishmentNumber_: { type: String, default: "" },
          subEstablishmentNumber_: { type: String, default: "" },
          epfoOfficeCode_: { type: String, default: "" },
          stateCode_: { type: String, default: "" },
          name: { type: String, default: "" },
          epfoOfficeName: { type: String, default: "" },
          address: { type: String, default: "" },
        },
      ],
      exemptionStatus: { type: String, default: "" },
      factoryDetails: [
        {
          name: { type: String, default: "" },
          fatherName: { type: String, default: "" },
          dateOfBirth: { type: Date, default: null },
          address: { type: String, default: "" },
          designation: { type: String, default: "" },
          tenureBeginDate: { type: Date, default: null },
        },
      ],
      fax: { type: String, default: null },
      fullAddress_: { type: String, default: "" },
      isAddressQualityPoor_: { type: Boolean, default: null },
      isCinCorrespondsToEstablishment_: { type: Boolean, default: false },
      isDomainInvalid_: { type: Boolean, default: null },
      isEmailDisposable_: { type: Boolean, default: null },
      isEmailInvalid_: { type: Boolean, default: null },
      isEpfClosed: { type: Boolean, default: null },
      isEpfRegisteredWithBifr: { type: Boolean, default: null },
      isEpfTransactionDefault: { type: Boolean, default: false },
      isEpfTransactionDelay: { type: Boolean, default: false },
      isEpfUnderLiquidation: { type: Boolean, default: null },
      isPanCorrespondsToEstablishment_: { type: Boolean, default: false },
      laborIdentificationNumber: { type: String, default: null },
      lastUpdatedOn: { type: Date, default: null },
      mcaEntityId: { type: String, default: "" },
      msmeOrderDate: { type: Date, default: null },
      msmeOrderNumber: { type: String, default: null },
      nameAsPerPan: { type: String, default: "" },
      otherCodesWithSameEstablishment: { type: [String], default: [] },
      ownershipType: { type: String, default: "" },
      pan: { type: String, default: "" },
      panStatus: { type: String, default: "" },
      pincode: { type: String, default: "" },
      postCoverageStatus: { type: String, default: null },
      primaryBusinessActivity: { type: String, default: "" },
      primaryEstablishmentId_: { type: String, default: "" },
      sectionApplicable: { type: String, default: "" },
      sourceUri: { type: String, default: null },
      startupOrderDate: { type: Date, default: null },
      startupOrderNumber: { type: String, default: null },
      state: { type: String, default: "" },
      stateCode_: { type: String, default: "" },
      status: { type: String, default: "" },
      stockKeepingUnits: [
        {
          establishmentId: { type: String, default: "" },
          primaryEstablishmentId_: { type: String, default: "" },
          establishmentNumber_: { type: String, default: "" },
          subEstablishmentNumber_: { type: String, default: "" },
          epfoOfficeCode_: { type: String, default: "" },
          stateCode_: { type: String, default: "" },
          name: { type: String, default: "" },
          epfoOfficeName: { type: String, default: null },
          address: { type: String, default: null },
        },
      ],
      subEstablishmentNumber_: { type: String, default: "" },
      transactionAmounts: { type: [String], default: [] },
      transactionDefaults: { type: [String], default: [] },
      transactionDelays: { type: [String], default: [] },
      unitsUnderSameJurisdiction: { type: [String], default: [] },
      website: { type: String, default: null },
      websiteDomain: { type: String, default: null },
      workingStatus: { type: String, default: "" },
      timestamp: { type: Date, default: null },
    },
    { timestamps: true }
  );

  module.exports = mongoose.model('EpfDetail', EpfDetailSchema);
  