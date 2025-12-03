const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const pollsRouter = require('./routers/polls');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/polls', pollsRouter);

const PORT = process.env.PORT || 8001;
// Use a separate DB for testing if needed, or default
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/polling-app';

// Only connect and listen if this file is run directly (not imported by tests)
if (require.main === module) {
  mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch(err => console.error("MongoDB connection failed:", err));
}

module.exports = app; // Export app for testing
