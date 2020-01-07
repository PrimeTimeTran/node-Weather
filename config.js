const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  DARKSKY_API_KEY: process.env.DARKSKY_API_KEY,
  MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
};