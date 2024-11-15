require('dotenv').config();
const axios = require('axios');
const logger = require('../utils/logger');

const API_KEY = process.env.GOOGLE_API_KEY;

async function fetchPlaceDetails(placeId) {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
      params: {
        place_id: placeId,
        key: API_KEY,
        fields: 'address_components,plus_code,types,place_id',
        language: 'en'
      },
    });

    if (response.data.status === 'OK') {
      return response.data.result;
    } else {
      logger.error(`Error fetching place data: ${response.data.status}`);
      logger.warn(response.data.error_message);
      return null;
    }
  } catch (error) {
    logger.error(`API request error: ${error}`);
    if (error.response) {
      logger.error(`${error.response.status}, ${error.message}`);
    }
    return null;
  }
}

module.exports = { fetchPlaceDetails };
