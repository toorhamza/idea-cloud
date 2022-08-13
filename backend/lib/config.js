require("dotenv").config();

const PORT = process.env.PORT;
const MONGOOSE_DATABASE_URL = process.env.MONGOOSE_DATABASE_URL;
const SECRET = process.env.SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;

module.exports = {
  PORT,
  MONGOOSE_DATABASE_URL,
  SECRET,
  FRONTEND_URL
};
