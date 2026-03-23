const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/startups', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(`https://api.crunchbase.com/v3.1/odm-organizations`, {
      params: {
        user_key: process.env.CRUNCHBASE_API_KEY,
        name: query || 'startup',
        locations: 'Rwanda'
      }
    });
    res.json(response.data.data.items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch startups.' });
  }
});

router.get('/location', async (req, res) => {
  const { city } = req.query;
  try {
    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        q: city,
        key: process.env.OPENCAGE_API_KEY
      }
    });
    res.json(response.data.results[0].geometry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch location info.' });
  }
});

module.exports = router;