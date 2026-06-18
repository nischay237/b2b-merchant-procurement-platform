const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const procurementRoutes = require('./routes/procurementRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/merchant_procurement_b2b';

// Express Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Database Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('🍃 MongoDB Connected Successfully via Mongoose!'))
  .catch(err => console.log('⚠️ MongoDB Connection Warning (Using local fallback data):', err.message));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    message: 'MERN Express API Server running',
    mongodb_connected: mongoose.connection.readyState === 1
  });
});

// Mount Procurement Express Routes
app.use('/api/procurement', procurementRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 MERN Express REST API Server running on port ${PORT}`);
});
