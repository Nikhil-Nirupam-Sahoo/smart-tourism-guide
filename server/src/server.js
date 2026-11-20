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

let seedInfo = 'starting';

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'smart-tourism-server',
    version: '2026-11-20-india',
    destinations: seedDestinations.length,
    seedInfo,
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
    seedInfo = 'demo mode (no MONGO_URI)';
    console.warn('⚠️  MONGO_URI not set — running in demo mode (in-memory data)');
    console.log(`🌱 Using ${memory.destinations ? memory.destinations.length : 'seed'} in-memory destinations`);
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
    seedInfo = 'connected, seeding…';

    const Destination = require('./models/Destination');
    const failures = [];

    // Always upsert: works on a fresh database and on an existing one with new seeds.
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
    const total = await Destination.countDocuments();
    seedInfo = `done — ${total} destinations, ${failures.length} seed warnings`;
    console.log(`📊 ${total} destinations in database (seed complete)`);
    if (failures.length) console.warn('   First failures:', failures.slice(0, 5).join(' | '));
  } catch (err) {
    seedInfo = `error: ${err.message}`;
    console.error('❌ MongoDB connection/seed failed:', err.message);
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
