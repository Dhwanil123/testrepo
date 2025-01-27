const express = require('express');
const axios = require('axios');
const GstProfile = require('../models/GstProfile');

const router = express.Router();

// POST endpoint to save GST profile
router.post('/save-profile', async (req, res) => {
  const { id, name, city } = req.body;

  if (!id || !name || !city) {
    return res.status(400).json({ error: 'id, name, and city are required' });
  }

  try {
    // Fetch data from Karza API
    const response = await axios.post(
      'https://api.karza.in/scan/test/gstprofile',
      { id },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-karza-key': process.env.KARZA_API_KEY,
        },
      }
    );

    const result = response.data.result[0];
    const profileData = {
      kid: id,
      name,
      city,
      gstin: result.gstin,
      address: result.address,
      aggregateTurnover: result.aggregateTurnover,
      dateOfRegistration: result.dateOfRegistration,
      status: result.status,
      natureOfBusiness: result.natureOfBusiness,
      signatories: result.signatories,
    };

    // Save to MongoDB
    const gstProfile = new GstProfile(profileData);
    await gstProfile.save();

    res.status(201).json({ message: 'Data saved successfully', data: gstProfile });
  } catch (error) {
    console.error('Error fetching data or saving profile:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
