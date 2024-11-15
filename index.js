const pool = require('./config/db');
const { fetchPlaceDetails } = require('./services/googlePlacesService');
const logger = require('./utils/logger');

const SLEEP_INTERVAL = 300;

async function getExistingSpots() {
  const res = await pool.query('SELECT spot_id, place_id FROM spots ORDER BY spot_id LIMIT 10 OFFSET 10');
  return res.rows;
}

async function updateSpotData(placeId, placeData) {
  const { address_components, plus_code, types } = placeData;

  await pool.query(
    `UPDATE spots SET address_components = $1, plus_code = $2, types = $3
     WHERE place_id = $4`,
    [address_components, plus_code, types, placeId]
  );

  logger.info(`Updated spot with place_id: ${placeId}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSyncProcess() {
  logger.info('Starting PlacesAPI-SyncTool...');
  const spots = await getExistingSpots();
  logger.info(`Found ${spots.length} spots to sync.`);

  let index = 0;
  logger.info('Running sync process...\n');

  for (const spot of spots) {
    const spotId = spot.spot_id;
    const placeId = spot.place_id;

    logger.info(`Syncing spot_id: ${spotId}`);

    const placeData = await fetchPlaceDetails(placeId);

    if (placeData) {
      await updateSpotData(placeId, placeData);
    } else {
      logger.warn(`\nFailed to fetch data for place_id: ${placeId}. ${spotId}. Continuing...\n`);
    }

    await sleep(SLEEP_INTERVAL);
  }

  logger.info('\nSync process completed.');
  process.exit(0);
}

startSyncProcess();
