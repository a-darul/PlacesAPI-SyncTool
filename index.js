const pool = require('./config/db');
const { fetchPreferredPlaceDetails } = require('./services/googlePlacesService');
const logger = require('./utils/logger');

const SLEEP_INTERVAL = 1200;

async function getExistingSpots() {
  const res = await pool.query('SELECT spot_id, place_id FROM spots ORDER BY spot_id DESC LIMIT 5');
  return res.rows;
}

async function updateSpotData(placeId, placeData) {
  const { websiteUri: website, ...details } = placeData;

  await pool.query(
    `UPDATE spots SET website = $1, details = $2
     WHERE place_id = $3`,
    [website, details, placeId]
  );

  logger.info(`Updated spot with place_id: ${placeId}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSyncProcess() {
  logger.debug('Starting PlacesAPI-SyncTool...');
  const spots = await getExistingSpots();
  logger.info(`Found ${spots.length} spots to sync.`);

  let count = 1;
  logger.debug('Running sync process...\n');

  for (const spot of spots) {
    const spotId = spot.spot_id;
    const placeId = spot.place_id;

    logger.info(`${count}. Syncing spot_id: ${spotId}`);

    const placeData = await fetchPreferredPlaceDetails(placeId);

    if (placeData) {
      await updateSpotData(placeId, placeData);
    } else {
      logger.warn(`Failed to fetch data for place_id: ${placeId}. ${spotId}. Continuing...\n`);
    }

    count++;
    await sleep(SLEEP_INTERVAL);
  }

  logger.debug('Sync process completed.');
  process.exit(0);
}

startSyncProcess();
