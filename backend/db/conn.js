require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true,family:4 })
  .then(() => {
    console.log("Connected to MongoDB");
  }) 
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


