const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const itemRoutes = require("./routes/itemRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());




// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

  app.use("/api/items", itemRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
