const express = require('express');
const axios = require('axios');
const router = express.Router();

// Fetch startup data with query and pagination
router.get('/startups', async (req, res) => {
  const { query = '', page = 1 } = req.query;
  try {
    const response = await axios.get('https://api.crunchbase.com/v3.1/odm-organizations', {
      params: {
        user_key: process.env.CRUNCHBASE_API_KEY,
        name: query,
        locations: 'Rwanda',
        page: page,
      }
    });

    const items = response.data?.data?.items || [];
    res.json({ items, page: page, total: items.length });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch startups. Check API keys or backend logs.' });
  }
});

// Location endpoint (optional, for advanced features)
router.get('/location', async (req, res) => {
  const { city } = req.query;
  try {
    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        q: city,
        key: process.env.OPENCAGE_API_KEY,
      }
    });
    res.json(response.data.results[0].geometry);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch location info.' });
  }
});

module.exports = router;
export async function fetchStartups() {
  try {
    const response = await fetch('http://localhost:5000/api/startups'); // match your backend URL
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching startups:', error);
    return [];
  }
}