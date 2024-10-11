const express = require('express');
const { getLatestCryptoData, getStandardDeviation } = require('../services/cryptoService');

const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    const { coin } = req.query;
    if (!coin) {
      return res.status(400).json({ error: 'Coin parameter is required' });
    }

    const latestData = await getLatestCryptoData(coin);
    if (!latestData) {
      return res.status(404).json({ error: 'No data found for the specified coin' });
    }

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h,
      timestamp: latestData.timestamp
    });
  } catch (error) {
    console.error('Error in /stats route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/deviation', async (req, res) => {
  try {
    const { coin } = req.query;
    if (!coin) {
      return res.status(400).json({ error: 'Coin parameter is required' });
    }

    const deviation = await getStandardDeviation(coin);
    res.json({ deviation: parseFloat(deviation.toFixed(2)) });
  } catch (error) {
    console.error('Error in /deviation route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
