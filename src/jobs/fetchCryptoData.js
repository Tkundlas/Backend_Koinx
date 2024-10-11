const cron = require('node-cron');
const { fetchCryptoData, saveCryptoData } = require('../services/cryptoService');

const coins = ['bitcoin', 'matic-network', 'ethereum'];

const fetchAndSaveCryptoData = async () => {
  for (const coinId of coins) {
    try {
      const data = await fetchCryptoData(coinId);
      await saveCryptoData(data);
      console.log(`Data saved for ${coinId}`);
    } catch (error) {
      console.error(`Error processing ${coinId}:`, error);
    }
  }
};

const startCronJob = () => {
  // Run every 2 hours
  
  cron.schedule('0 */2 * * *', fetchAndSaveCryptoData);
  console.log('Cron job started');
};

module.exports = startCronJob;