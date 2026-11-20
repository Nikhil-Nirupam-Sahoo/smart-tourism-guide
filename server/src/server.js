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
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/960px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg',
    gallery: [
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/960px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg',
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Louvre_Museum_Wikimedia_Commons.jpg/960px-Louvre_Museum_Wikimedia_Commons.jpg',
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
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/960px-Skyscrapers_of_Shinjuku_2009_January.jpg',
    gallery: [
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/960px-Skyscrapers_of_Shinjuku_2009_January.jpg',
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Sensoji_2023.jpg/960px-Sensoji_2023.jpg',
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
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/TanahLot_2014.JPG/960px-TanahLot_2014.JPG',
    gallery: [
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/TanahLot_2014.JPG/960px-TanahLot_2014.JPG',
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Ubud_%2849818456887%29.jpg/960px-Ubud_%2849818456887%29.jpg',
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
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/SF_maig_2_cropped.jpg/960px-SF_maig_2_cropped.jpg',
    gallery: [
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/SF_maig_2_cropped.jpg/960px-SF_maig_2_cropped.jpg',
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Parc_guell_-_panoramio.jpg/960px-Parc_guell_-_panoramio.jpg',
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
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Table_Mountain_DanieVDM.jpg/960px-Table_Mountain_DanieVDM.jpg',
    gallery: [
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Table_Mountain_DanieVDM.jpg/960px-Table_Mountain_DanieVDM.jpg',
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Camps_bay_%2853460319478%29_%28cropped%29.jpg/960px-Camps_bay_%2853460319478%29_%28cropped%29.jpg',
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
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Kiyomizu-dera%2C_Kyoto%2C_November_2016_-02.jpg/960px-Kiyomizu-dera%2C_Kyoto%2C_November_2016_-02.jpg',
    gallery: [
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Kiyomizu-dera%2C_Kyoto%2C_November_2016_-02.jpg/960px-Kiyomizu-dera%2C_Kyoto%2C_November_2016_-02.jpg',
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine%2C_Kyoto%2C_Japan.jpg/960px-Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine%2C_Kyoto%2C_Japan.jpg',
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
      // Keep existing records but refresh seeded images/booking links on every deploy.
      await Promise.all(
        seedDestinations.map((d) =>
          Destination.updateOne(
            { name: d.name },
            {
              $set: {
                image: d.image,
                gallery: d.gallery,
                bookingLinks: d.bookingLinks,
              },
            }
          )
        )
      );
      console.log(`📊 ${count} destinations in database — seeded images refreshed`);
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
