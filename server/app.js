require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// data base connection
mongoose.connect(process.env.DBURI)
  .then(() => {
    console.log("connected to database");
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Listening to port ${port}`);
    })
  })
  .catch((err) => {
    console.log(err);
  });

// models
const Ad = require("./models/ad");
const Admin = require("./models/admin");
const Advertiser = require('./models/advertiser');
const Campaign = require('./models/campaign');
const Click = require('./models/click');
const Publisher = require('./models/publisher');
const { User } = require('./models/user');
const View = require('./models/view');

// routes
const adminRoute = require("./routes/adminRoute");
const advertiserRoute = require("./routes/advertiserRoute");
const authRoute = require("./routes/auth");
const publisherReportRoute = require("./routes/publisherReportRoute");
const trackRoute = require("./routes/trackRoute");

app.get("/change", async (req, res) => {
  res.send({ message: "working" });
})

app.use("/image/upload", express.static(path.join(__dirname, './uploads')));
app.use("/video/upload", express.static(path.join(__dirname, './uploads')));

// app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/advertiser", advertiserRoute);
app.use("/api/auth", authRoute);
app.use("/api/publisher", publisherReportRoute);
app.use("/api/track", trackRoute);

app.use(express.static(path.join(__dirname, "./dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

// Error handling middleware for Multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(500).send(err.message);
  }
});