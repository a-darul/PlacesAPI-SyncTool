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

async function fetchPreferredPlaceDetails(placeId) {
  try {
    const response = await axios.get(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': `websiteUri,allowsDogs,curbsidePickup,delivery,dineIn,editorialSummary,evChargeOptions,fuelOptions,goodForChildren,goodForGroups,goodForWatchingSports,liveMusic,menuForChildren,parkingOptions,paymentOptions,outdoorSeating,reservable,restroom,reviews,servesBeer,servesBreakfast,servesBrunch,servesCocktails,servesCoffee,servesDessert,servesDinner,servesLunch,servesVegetarianFood,servesWine,takeout`,
      },
    });

    if (Object.keys(response.data).length === 0) {
      logger.warn(`No place data found for placeId: ${placeId}`);
      return null;
    }

    return response.data;

  } catch (error) {
    logger.error(`API request error: ${error}`);
    if (error.response) {
      logger.error(`${error.response.data.error.status}, ${error.response.data.error.message}`);
    }
    return null;
  }
}

module.exports = { fetchPlaceDetails, fetchPreferredPlaceDetails };
