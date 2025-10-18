// Bakend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// --- Import Auth Routes ---
const authRoutes = require('./src/routes/auth'); // Add this line

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow requests from your frontend (adjust origins in production)
app.use(express.json()); // Allow the server to accept JSON in the request body

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser and useUnifiedTopology are deprecated but won't harm
})
.then(() => console.log('MongoDB connected successfully.'))
.catch(err => console.error('MongoDB connection error:', err));


// --- API Routes ---
app.get('/', (req, res) => {
  res.send('SocialMetrics API is running!');
});

// --- Use Auth Routes ---
app.use('/api/auth', authRoutes); // Add this line

// --- Server Start ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});