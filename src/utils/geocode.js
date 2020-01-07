const request = require("request");

const config = require('../../config')

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/${config.DARKSKY_API_KEY}/${lat},${long}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service.");
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      const {
        currently: { temperature, precipProbability },
        daily: {
          data: [{ summary, temperatureHigh, temperatureLow }]
        }
      } = body;

      callback(undefined, {
        summary: `${summary} It's currently ${temperature} degrees out. Today's high is ${temperatureHigh} and today's low is ${temperatureLow}. There is ${precipProbability} chance of rain.`
      });
    }
  });
};

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${config.MAPBOX_API_KEY}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services.");
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Please try another search.");
    } else {
      try {
        const [longitude, latitude] = response.body.features[0].center;
        const location = response.body.features[0].place_name;
        callback(undefined, {
          location,
          latitude,
          longitude
        });
      } catch (error) {
        console.log("No location found.");
      }
    }
  });
};

module.exports = {
  geocode,
  forecast
};
