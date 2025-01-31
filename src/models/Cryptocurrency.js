const mongoose = require('mongoose');

const CryptocurrencySchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  change24h: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('Cryptocurrency', CryptocurrencySchema);
