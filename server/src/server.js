require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const memory = require('./store/memory');

const authRoutes = require('./routes/authRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const tripRoutes = require('./routes/tripRoutes');
const aiRoutes = require('./routes/aiRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Middleware ----------
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'smart-tourism-server',
    version: '2026-11-20-india',
    destinations: seedDestinations.length,
    time: new Date().toISOString(),
  });
});

// ---------- API Routes ----------
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, _req, res, _next) => {
  // Respect statuses set with res.status(...) before throwing.
  const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ---------- Destination seed data ----------
const seedDestinations = require('./data/destinations');

async function connectAndSeed() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn('⚠️  MONGO_URI not set — running in demo mode (in-memory data)');
    console.log(`🌱 Using ${memory.destinations ? memory.destinations.length : 'seed'} in-memory destinations`);
    return;
  }

  try {
    await mongoose.connect(mongoUri, {
      // modern mongoose doesn't need useNewUrlParser / useUnifiedTopology
    });
    console.log('✅ Connected to MongoDB');

    const Destination = require('./models/Destination');
    const count = await Destination.countDocuments();
    if (count === 0) {
      await Destination.insertMany(seedDestinations);
      console.log(`🌱 Seeded ${seedDestinations.length} demo destinations`);
    } else {
      // Upsert every seed destination: insert new ones (e.g. new Indian cities)
      // and refresh images/booking links on existing ones.
      const failures = [];
      for (const d of seedDestinations) {
        try {
          await Destination.updateOne({ name: d.name }, { $setOnInsert: d }, { upsert: true });
          await Destination.updateOne(
            { name: d.name },
            {
              $set: {
                image: d.image,
                gallery: d.gallery,
                bookingLinks: d.bookingLinks,
                description: d.description,
                shortDescription: d.shortDescription,
                tags: d.tags,
                bestTimeToVisit: d.bestTimeToVisit,
                location: d.location,
              },
            }
          );
        } catch (seedErr) {
          failures.push(`${d.name}: ${seedErr.message}`);
        }
      }
      if (failures.length) console.warn('⚠️  Seed warnings:', failures.slice(0, 5).join(' | '));
      const updatedCount = await Destination.countDocuments();
      console.log(`📊 ${count} → ${updatedCount} destinations in database (seed upsert complete)`);
    }
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    console.warn('⚠️  Falling back to in-memory demo data');
  }
}

let server;

function start() {
  // Listen immediately so platform health checks pass while Mongo connects.
  server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT} (${process.env.NODE_ENV || 'development'})`);
  });
  // Seed/refresh in the background; requests use the in-memory fallback until ready.
  connectAndSeed();
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  if (server) server.close(() => process.exit(1));
});

start();

module.exports = app;
