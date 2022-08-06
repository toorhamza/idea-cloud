require('dotenv').config()

const PORT = process.env.PORT;
const MONGOOSE_DATABASE_URL = process.env.MONGOOSE_DATABASE_URL;

module.exports = {
    PORT,
    MONGOOSE_DATABASE_URL
}