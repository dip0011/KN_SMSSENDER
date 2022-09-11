const mongoose = require("mongoose");
const mongodbURL = process.env.MONGODB_URL;

//Connect MongoDB
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected to Databse");
}).catch(error =>
  console.log(error)
);
