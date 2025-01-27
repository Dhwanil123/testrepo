// const express = require('express');
// const axios = require('axios');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const app = express();
// app.use(express.json()); 

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// const GstProfileSchema = new mongoose.Schema({
//   kid: String,
//   name: String,
//   city: String,
//   gstin: String,
//   address: String,
//   aggregateTurnover: String,
//   dateOfRegistration: Date,
//   status: String,
//   natureOfBusiness: [String],
//   signatories: [String],
// });

// const GstProfile = mongoose.model('GstProfile', GstProfileSchema);

// app.post('/api/save-profile', async (req, res) => {
//   const { id, name, city } = req.body;

//   if (!id || !name || !city) {
//     return res.status(400).json({ error: 'id, name, and city are required' });
//   }

//   try {
//     const karzaResponse = await axios.post(
//       'https://api.karza.in/kscan/test/gst-profile',
//       { id }, 
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'x-karza-key': process.env.KARZA_API_KEY, 
//         },
//       }
//     );

//     const result = karzaResponse.data.result[0];
//     const processedData = {
//       kid: id,
//       name,
//       city,
//       gstin: result.gstin,
//       address: result.address,
//       aggregateTurnover: result.aggregateTurnover,
//       dateOfRegistration: result.dateOfRegistration,
//       status: result.status,
//       natureOfBusiness: result.natureOfBusiness,
//       signatories: result.signatories,
//     };

//     const newGstProfile = new GstProfile(processedData);
//     await newGstProfile.save();

//     res.status(201).json({ message: 'Data saved successfully', data: newGstProfile });
//   } catch (error) {
//     console.error('Error:', error.response?.data || error.message);
//     res.status(500).json({ error: 'Failed to fetch data or save to database' });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });






















// // const express = require('express');
// // const app = express();
// // const PORT = 3000;

// // app.get('/', (req, res) => {
// //     res.send('Hello, Node.js!');
// // });

// // app.listen(PORT, () => {
// //     console.log(`Server is running on http://localhost:${PORT}`);
// // });







const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const gstProfileRoutes = require('./routes/gstProfileRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

// Define routes
app.use('/api', gstProfileRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
