const axios = require('axios');
const Cryptocurrency = require('../models/Cryptocurrency');

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

const fetchCryptoData = async (coinId) => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/coins/${coinId}`);
    const { market_data } = response.data;

    return {
      coinId,
      price: market_data.current_price.usd,
      marketCap: market_data.market_cap.usd,
      change24h: market_data.price_change_percentage_24h,
    };
  } catch (error) {
    console.error(`Error fetching data for ${coinId}:`, error);
    throw error;
  }
};


const saveCryptoData = async (data) => {
    try {
      const crypto = new Cryptocurrency(data);
      const savedData = await crypto.save();
      console.log(`[MongoDB] Data saved for ${data.coinId} at ${savedData.timestamp}`);
      return savedData;
    } catch (error) {
      console.error('Error saving crypto data:', error);
      throw error;
    }
  };
  
  const getLatestCryptoData = async (coinId) => {
    try {
      const latestData = await Cryptocurrency.findOne({ coinId }).sort({ timestamp: -1 });
      if (latestData) {
        console.log(`[MongoDB] Latest data for ${coinId} fetched, timestamp: ${latestData.timestamp}`);
      } else {
        console.log(`[MongoDB] No data found for ${coinId}`);
      }
      return latestData;
    } catch (error) {
      console.error(`Error fetching latest data for ${coinId}:`, error);
      throw error;
    }
  };

const getStandardDeviation = async (coinId) => {
  try {
    const prices = await Cryptocurrency.find({ coinId }, 'price')
      .sort({ timestamp: -1 })
      .limit(100)
      .lean();

    const priceValues = prices.map((p) => p.price);
    const mean = priceValues.reduce((sum, price) => sum + price, 0) / priceValues.length;
    const squaredDifferences = priceValues.map((price) => Math.pow(price - mean, 2));
    const variance = squaredDifferences.reduce((sum, diff) => sum + diff, 0) / priceValues.length;
    const standardDeviation = Math.sqrt(variance);

    return standardDeviation;
  } catch (error) {
    console.error(`Error calculating standard deviation for ${coinId}:`, error);
    throw error;
  }
};

module.exports = {
  fetchCryptoData,
  saveCryptoData,
  getLatestCryptoData,
  getStandardDeviation,
};

