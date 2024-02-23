require("dotenv").config();

const PORT = process.env.PORT;

const actualDb_URL = process.env.MONGODB_URI;
const testDb_URL = process.env.TEST_MONGO_URI;

const MONGO_URI = process.env.NODE_ENV === "test" ? testDb_URL : actualDb_URL;

module.exports = { MONGO_URI, PORT };
