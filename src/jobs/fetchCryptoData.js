const cron = require('node-cron');
const { fetchCryptoData, saveCryptoData } = require('../services/cryptoService');

const coins = ['bitcoin', 'matic-network', 'ethereum'];

const fetchAndSaveCryptoData = async () => {
  console.log(`[Cron Job] Starting data fetch at ${new Date().toISOString()}`);
  for (const coinId of coins) {
    try {
      const data = await fetchCryptoData(coinId);
      const savedData = await saveCryptoData(data);
      console.log(`[MongoDB] Data saved for ${coinId} at ${savedData.timestamp}`);
    } catch (error) {
      console.error(`[Error] Processing ${coinId}:`, error);
    }
  }
  console.log(`[Cron Job] Data fetch complete at ${new Date().toISOString()}`);
};

const startCronJob = () => {
  cron.schedule('0 */2 * * *', fetchAndSaveCryptoData);
  console.log('[Cron Job] Initialized, will run every 1 minute');
};

module.exports = startCronJob;
