const express = require('express');
const axios = require('axios');
const GstProfile = require('../models/GstProfile');

const router = express.Router();

router.post('/save-profile', async (req, res) => {
  const { id, name, city } = req.body;

  if (!id || !name || !city) {
    return res.status(400).json({ error: 'id, name, and city are required' });
  }

  try {
    const response = await axios.post(
      'https://api.karza.in/kscan/test/v3/gst-profile',
      { id },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-karza-key': process.env.KARZA_API_KEY,
        },
      }
    );

    // const result = response.data.result[0];
    // const profileData = {
    //   kid: id,
    //   name,
    //   city,
    //   gstin: result.gstin,
    //   address: result.address,
    //   aggregateTurnover: result.aggregateTurnover,
    //   dateOfRegistration: result.dateOfRegistration,
    //   status: result.status,
    //   natureOfBusiness: result.natureOfBusiness,
    //   signatories: result.signatories,
    // };


    const profileData = {
      requestId: response.data.requestId,
      kid: id,
      name,
      city,
      gstin: result.gstin,
      address: result.address,
      aggregateTurnover: result.aggregateTurnover,
      aggregateTurnovers: result.aggregateTurnovers || [],
      branches: result.branches || [],
      dateOfRegistration: result.dateOfRegistration,
      status: result.status,
      natureOfBusiness: result.natureOfBusiness || [],
      signatories: result.signatories || [],
      signatoriesContact: result.signatoriesContact || [],
      filingFrequencies: result.filingFrequencies || [],
      goodsDetails: result.goodsDetails || [],
      grossTotalIncomes: result.grossTotalIncomes || [],
      timestamp: result.timestamp,
      complianceRating: result.complianceRating,
    };
    const gstProfile = new GstProfile(profileData);
    await gstProfile.save();

    res.status(201).json({ message: 'Data saved successfully', data: gstProfile });
  } catch (error) {
    console.error('Error fetching data or saving profile:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;



//https://testrepo-1-nn5j.onrender.com/api/save-profile