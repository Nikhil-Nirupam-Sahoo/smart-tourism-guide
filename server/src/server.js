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
  res.json({ status: 'ok', service: 'smart-tourism-server', time: new Date().toISOString() });
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Eiffel_Tower_%28cropped%29.jpg/1024px-Eiffel_Tower_%28cropped%29.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Eiffel_Tower_%28cropped%29.jpg/1024px-Eiffel_Tower_%28cropped%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Musee_du_Louvre_%28cropped%29.jpg/1024px-Musee_du_Louvre_%28cropped%29.jpg',
    ],
    category: 'culture',
    tags: ['romance', 'museums', 'fashion', 'food'],
    rating: 4.8,
    reviewCount: 1240,
    priceLevel: 'luxury',
    bestTimeToVisit: 'April to October',
    location: { type: 'Point', coordinates: [2.3522, 48.8566] },
    isFeatured: true,
    bookingLinks: {
      flights: 'https://www.skyscanner.com/',
      hotels: 'https://www.booking.com/',
      activities: 'https://www.getyourguide.com/',
    },
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    city: 'Tokyo',
    description: 'A vibrant metropolis where ultramodern skyscrapers stand beside historic temples, offering world-class dining and unique culture.',
    shortDescription: 'Neon lights, temples, and cutting-edge tech.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Tokyo_Tower_%2813608033575%29.jpg/1024px-Tokyo_Tower_%2813608033575%29.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Tokyo_Tower_%2813608033575%29.jpg/1024px-Tokyo_Tower_%2813608033575%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Senso-ji_Temple%2C_Tokyo.jpg/1024px-Senso-ji_Temple%2C_Tokyo.jpg',
    ],
    category: 'city',
    tags: ['technology', 'food', 'shopping', 'temples'],
    rating: 4.9,
    reviewCount: 1560,
    priceLevel: 'mid-range',
    bestTimeToVisit: 'March to May, September to November',
    location: { type: 'Point', coordinates: [139.6917, 35.6895] },
    isFeatured: true,
    bookingLinks: {
      flights: 'https://www.skyscanner.com/',
      hotels: 'https://www.booking.com/',
      activities: 'https://www.getyourguide.com/',
    },
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    city: 'Denpasar',
    description: 'Tropical paradise known for its lush rice terraces, volcanic mountains, coral reefs, and spiritual retreats.',
    shortDescription: 'Tropical beaches and serene rice terraces.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Pura_Lempuyang_Luhur.jpg/1024px-Pura_Lempuyang_Luhur.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Pura_Lempuyang_Luhur.jpg/1024px-Pura_Lempuyang_Luhur.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Tegalalang_Rice_Terrace%2C_Bali.jpg/1024px-Tegalalang_Rice_Terrace%2C_Bali.jpg',
    ],
    category: 'relaxation',
    tags: ['beach', 'wellness', 'surfing', 'temples'],
    rating: 4.7,
    reviewCount: 980,
    priceLevel: 'budget',
    bestTimeToVisit: 'April to October',
    location: { type: 'Point', coordinates: [115.1889, -8.4095] },
    isFeatured: true,
    bookingLinks: {
      flights: 'https://www.skyscanner.com/',
      hotels: 'https://www.booking.com/',
      activities: 'https://www.getyourguide.com/',
    },
  },
  {
    name: 'Barcelona',
    country: 'Spain',
    city: 'Barcelona',
    description: 'Mediterranean city renowned for Gaudí architecture, lively tapas culture, beaches, and a rich artistic heritage.',
    shortDescription: 'Gaudí architecture and Mediterranean vibes.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Sagrada_Familia_%28Facade%29.jpg/1024px-Sagrada_Familia_%28Facade%29.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Sagrada_Familia_%28Facade%29.jpg/1024px-Sagrada_Familia_%28Facade%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Parc_G%C3%BCell%2C_Barcelona.jpg/1024px-Parc_G%C3%BCell%2C_Barcelona.jpg',
    ],
    category: 'food',
    tags: ['architecture', 'tapas', 'beach', 'art'],
    rating: 4.6,
    reviewCount: 870,
    priceLevel: 'mid-range',
    bestTimeToVisit: 'May to October',
    location: { type: 'Point', coordinates: [2.1734, 41.3851] },
    isFeatured: false,
    bookingLinks: {
      flights: 'https://www.skyscanner.com/',
      hotels: 'https://www.booking.com/',
      activities: 'https://www.getyourguide.com/',
    },
  },
  {
    name: 'Cape Town',
    country: 'South Africa',
    city: 'Cape Town',
    description: 'Stunning coastal city dominated by Table Mountain, with beaches, vineyards, and rich wildlife nearby.',
    shortDescription: 'Table Mountain, beaches, and vineyards.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Table_Mountain_Aerial_Cableway%2C_Cape_Town.jpg/1024px-Table_Mountain_Aerial_Cableway%2C_Cape_Town.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Table_Mountain_Aerial_Cableway%2C_Cape_Town.jpg/1024px-Table_Mountain_Aerial_Cableway%2C_Cape_Town.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Victoria_%26_Alfred_Waterfront%2C_Cape_Town.jpg/1024px-Victoria_%26_Alfred_Waterfront%2C_Cape_Town.jpg',
    ],
    category: 'nature',
    tags: ['hiking', 'wine', 'wildlife', 'beach'],
    rating: 4.8,
    reviewCount: 640,
    priceLevel: 'budget',
    bestTimeToVisit: 'November to March',
    location: { type: 'Point', coordinates: [18.4241, -33.9249] },
    isFeatured: false,
    bookingLinks: {
      flights: 'https://www.skyscanner.com/',
      hotels: 'https://www.booking.com/',
      activities: 'https://www.getyourguide.com/',
    },
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    city: 'Kyoto',
    description: 'Ancient capital filled with classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden houses.',
    shortDescription: 'Temples, gardens, and traditional Japan.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Kinkaku-ji_%28Golden_Pavilion%29%2C_Kyoto.jpg/1024px-Kinkaku-ji_%28Golden_Pavilion%29%2C_Kyoto.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Kinkaku-ji_%28Golden_Pavilion%29%2C_Kyoto.jpg/1024px-Kinkaku-ji_%28Golden_Pavilion%29%2C_Kyoto.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Fushimi_Inari_Taisha%2C_Kyoto.jpg/1024px-Fushimi_Inari_Taisha%2C_Kyoto.jpg',
    ],
    category: 'history',
    tags: ['temples', 'cherry blossoms', 'tea ceremony', 'culture'],
    rating: 4.9,
    reviewCount: 720,
    priceLevel: 'mid-range',
    bestTimeToVisit: 'March to May, October to November',
    location: { type: 'Point', coordinates: [135.7681, 35.0116] },
    isFeatured: false,
    bookingLinks: {
      flights: 'https://www.skyscanner.com/',
      hotels: 'https://www.booking.com/',
      activities: 'https://www.getyourguide.com/',
    },
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
