require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const memory = require('./store/memory');

const authRoutes = require('./routes/authRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const tripRoutes = require('./routes/tripRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Middleware ----------
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'smart-tourism-server', time: new Date().toISOString() });
});

// ---------- API Routes ----------
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/ai', aiRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ---------- Demo destination seed data ----------
const seedDestinations = [
  {
    name: 'Paris',
    country: 'France',
    city: 'Paris',
    description: 'The City of Light, famous for its art, fashion, gastronomy, and iconic landmarks like the Eiffel Tower and Louvre Museum.',
    shortDescription: 'Art, fashion, and romance on the Seine.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511739001486-6bfe1427b44c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    ],
    category: 'culture',
    tags: ['romance', 'museums', 'fashion', 'food'],
    rating: 4.8,
    reviewCount: 1240,
    priceLevel: 'luxury',
    bestTimeToVisit: 'April to October',
    location: { type: 'Point', coordinates: [2.3522, 48.8566] },
    isFeatured: true,
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    city: 'Tokyo',
    description: 'A vibrant metropolis where ultramodern skyscrapers stand beside historic temples, offering world-class dining and unique culture.',
    shortDescription: 'Neon lights, temples, and cutting-edge tech.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1539067728879-ab317b8e3e04?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    ],
    category: 'city',
    tags: ['technology', 'food', 'shopping', 'temples'],
    rating: 4.9,
    reviewCount: 1560,
    priceLevel: 'mid-range',
    bestTimeToVisit: 'March to May, September to November',
    location: { type: 'Point', coordinates: [139.6917, 35.6895] },
    isFeatured: true,
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    city: 'Denpasar',
    description: 'Tropical paradise known for its lush rice terraces, volcanic mountains, coral reefs, and spiritual retreats.',
    shortDescription: 'Tropical beaches and serene rice terraces.',
    image: 'https://images.unsplash.com/photo-1537290961690-d8910cbc9762?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527937352226-aa2565c5b2bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1537290961690-d8910cbc9762?auto=format&fit=crop&w=800&q=80',
    ],
    category: 'relaxation',
    tags: ['beach', 'wellness', 'surfing', 'temples'],
    rating: 4.7,
    reviewCount: 980,
    priceLevel: 'budget',
    bestTimeToVisit: 'April to October',
    location: { type: 'Point', coordinates: [115.1889, -8.4095] },
    isFeatured: true,
  },
  {
    name: 'Barcelona',
    country: 'Spain',
    city: 'Barcelona',
    description: 'Mediterranean city renowned for Gaudí architecture, lively tapas culture, beaches, and a rich artistic heritage.',
    shortDescription: 'Gaudí architecture and Mediterranean vibes.',
    image: 'https://images.unsplash.com/photo-1532926437381-9968717a187f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537906710050-029921c7a6b6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532926437381-9968717a187f?auto=format&fit=crop&w=800&q=80',
    ],
    category: 'food',
    tags: ['architecture', 'tapas', 'beach', 'art'],
    rating: 4.6,
    reviewCount: 870,
    priceLevel: 'mid-range',
    bestTimeToVisit: 'May to October',
    location: { type: 'Point', coordinates: [2.1734, 41.3851] },
    isFeatured: false,
  },
  {
    name: 'Cape Town',
    country: 'South Africa',
    city: 'Cape Town',
    description: 'Stunning coastal city dominated by Table Mountain, with beaches, vineyards, and rich wildlife nearby.',
    shortDescription: 'Table Mountain, beaches, and vineyards.',
    image: 'https://images.unsplash.com/photo-1557813123-f9d9f0401a08?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518578204556-4c2f0f0ee408?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1557813123-f9d9f0401a08?auto=format&fit=crop&w=800&q=80',
    ],
    category: 'nature',
    tags: ['hiking', 'wine', 'wildlife', 'beach'],
    rating: 4.8,
    reviewCount: 640,
    priceLevel: 'budget',
    bestTimeToVisit: 'November to March',
    location: { type: 'Point', coordinates: [18.4241, -33.9249] },
    isFeatured: false,
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    city: 'Kyoto',
    description: 'Ancient capital filled with classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden houses.',
    shortDescription: 'Temples, gardens, and traditional Japan.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c877968a1e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c877968a1e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469702235878-9866292501e2?auto=format&fit=crop&w=800&q=80',
    ],
    category: 'history',
    tags: ['temples', 'cherry blossoms', 'tea ceremony', 'culture'],
    rating: 4.9,
    reviewCount: 720,
    priceLevel: 'mid-range',
    bestTimeToVisit: 'March to May, October to November',
    location: { type: 'Point', coordinates: [135.7681, 35.0116] },
    isFeatured: false,
  },
];

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
      console.log(`📊 ${count} destinations already in database`);
    }
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    console.warn('⚠️  Falling back to in-memory demo data');
  }
}

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT} (${process.env.NODE_ENV || 'development'})`);
  connectAndSeed();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});

module.exports = app;
