const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

require('dotenv').config();

const app = express();
app.use(cors()); // Allow frontend to access API
app.use(express.json());

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`StartupConnect backend running on port ${PORT}`);
});