const mongoose = require('mongoose')
const { MONGOOSE_DATABASE_URL } = require("./config");

const connectToDb = () => {
  try {
    mongoose.connect(MONGOOSE_DATABASE_URL);
    console.log("Connection has been established successfully to MongoDB");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return process.exit(1);
  }
  return null;
};

module.exports = {
  connectToDb,
};