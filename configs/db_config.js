const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT;
const MongoUri = process.env.MongoUri;

// connect db method
const connectDb = async () => {
  try {
    await mongoose.connect(MongoUri);
    console.log(`DB connected at Port ${PORT}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = { connectDb };
