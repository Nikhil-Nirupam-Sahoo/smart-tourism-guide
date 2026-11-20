// Destination seed data. Images are verified Wikimedia thumbnails.
// International entries are kept from the original demo; Indian entries were
// generated from Wikipedia summaries with verified image URLs.

const internationalDestinations = [
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
    isActive: true,
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
    isActive: true,
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
    isActive: true,
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
    isActive: true,
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
    isActive: true,
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
    isActive: true,
    bookingLinks: {
      flights: 'https://www.skyscanner.com/',
      hotels: 'https://www.booking.com/',
      activities: 'https://www.getyourguide.com/',
    },
  },
];

const indianDestinations = [
  {
    "name": "Agra",
    "country": "India",
    "city": "Agra",
    "description": "Agra is a city on the banks of the Yamuna river in the Indian state of Uttar Pradesh. It is a part of Western Uttar Pradesh, about 230 kilometres (140 mi) south-east of the national capital Delhi and 330 km west of the state capital Lucknow. It is also part of the Braj region. Popular for: Taj Mahal, Mughal, UNESCO.",
    "shortDescription": "Agra is a city on the banks of the Yamuna river in the Indian state of Uttar Pradesh.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Taj_Mahal%2C_Agra%2C_India.jpg/960px-Taj_Mahal%2C_Agra%2C_India.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Taj_Mahal%2C_Agra%2C_India.jpg/960px-Taj_Mahal%2C_Agra%2C_India.jpg"
    ],
    "category": "history",
    "tags": [
      "Taj Mahal",
      "Mughal",
      "UNESCO"
    ],
    "rating": 4.8,
    "reviewCount": 2100,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "October to March",
    "location": {
      "type": "Point",
      "coordinates": [
        78.0081,
        27.1767
      ]
    },
    "isFeatured": true,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Jaipur",
    "country": "India",
    "city": "Jaipur",
    "description": "Jaipur is the capital and largest city of the north-western Indian state of Rajasthan. As of 2011, the city had a population of 3.1 million, making it the tenth-most populous city in the country. Popular for: palaces, forts, bazaars.",
    "shortDescription": "Jaipur is the capital and largest city of the north-western Indian state of Rajasthan.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/960px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/960px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg"
    ],
    "category": "culture",
    "tags": [
      "palaces",
      "forts",
      "bazaars"
    ],
    "rating": 4.7,
    "reviewCount": 1850,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "October to March",
    "location": {
      "type": "Point",
      "coordinates": [
        75.7873,
        26.9124
      ]
    },
    "isFeatured": true,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Delhi",
    "country": "India",
    "city": "Delhi",
    "description": "Delhi, officially the National Capital Territory (NCT) of Delhi, is a megacity and a union territory of India containing New Delhi, the capital of India. Popular for: heritage, markets, food.",
    "shortDescription": "Delhi, officially the National Capital Territory (NCT) of Delhi, is a megacity and a union territory of India…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Jama_Masjid_2011.jpg/960px-Jama_Masjid_2011.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Jama_Masjid_2011.jpg/960px-Jama_Masjid_2011.jpg"
    ],
    "category": "history",
    "tags": [
      "heritage",
      "markets",
      "food"
    ],
    "rating": 4.5,
    "reviewCount": 2300,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "October to March",
    "location": {
      "type": "Point",
      "coordinates": [
        77.1025,
        28.7041
      ]
    },
    "isFeatured": true,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Mumbai",
    "country": "India",
    "city": "Mumbai",
    "description": "Mumbai, also known as Bombay, is the capital city of the Indian state of Maharashtra and the financial capital of India. Located on the Konkan coast along the west coast of India, it has a deep natural harbour. Popular for: Bollywood, food, coast.",
    "shortDescription": "Mumbai, also known as Bombay, is the capital city of the Indian state of Maharashtra and the financial capital…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Mumbai_Bandra-Worli_Sea_Link.jpg/960px-Mumbai_Bandra-Worli_Sea_Link.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Mumbai_Bandra-Worli_Sea_Link.jpg/960px-Mumbai_Bandra-Worli_Sea_Link.jpg"
    ],
    "category": "city",
    "tags": [
      "Bollywood",
      "food",
      "coast"
    ],
    "rating": 4.5,
    "reviewCount": 1900,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "November to February",
    "location": {
      "type": "Point",
      "coordinates": [
        72.8777,
        19.076
      ]
    },
    "isFeatured": true,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Kolkata",
    "country": "India",
    "city": "Kolkata",
    "description": "Kolkata, also known as Calcutta, is the capital and largest city of the Indian state of West Bengal. It lies on the eastern bank of the Hooghly River, 80 km (50 mi) west of the border with Bangladesh. Popular for: art, literature, food.",
    "shortDescription": "Kolkata, also known as Calcutta, is the capital and largest city of the Indian state of West Bengal.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Kolkata_maidan.jpg/960px-Kolkata_maidan.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Kolkata_maidan.jpg/960px-Kolkata_maidan.jpg"
    ],
    "category": "culture",
    "tags": [
      "art",
      "literature",
      "food"
    ],
    "rating": 4.4,
    "reviewCount": 1100,
    "priceLevel": "budget",
    "bestTimeToVisit": "October to March",
    "location": {
      "type": "Point",
      "coordinates": [
        88.3639,
        22.5726
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Chennai",
    "country": "India",
    "city": "Chennai",
    "description": "Chennai, also known as Madras, is the capital and largest city of Tamil Nadu, the southernmost state of India. It is located on the Coromandel Coast of the Bay of Bengal. Popular for: temples, beaches, food.",
    "shortDescription": "Chennai, also known as Madras, is the capital and largest city of Tamil Nadu, the southernmost state of India.…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/Chennai_Central.jpg/960px-Chennai_Central.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/Chennai_Central.jpg/960px-Chennai_Central.jpg"
    ],
    "category": "culture",
    "tags": [
      "temples",
      "beaches",
      "food"
    ],
    "rating": 4.3,
    "reviewCount": 980,
    "priceLevel": "budget",
    "bestTimeToVisit": "November to February",
    "location": {
      "type": "Point",
      "coordinates": [
        80.2707,
        13.0827
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Bengaluru",
    "country": "India",
    "city": "Bengaluru",
    "description": "Bengaluru, also known as Bangalore, is the capital and largest city of the southern Indian state of Karnataka. As per the 2011 census, the city had a population of 8.4 million, making it the third most populous city in India and the most populous in South India. Popular for: gardens, nightlife, tech.",
    "shortDescription": "Bengaluru, also known as Bangalore, is the capital and largest city of the southern Indian state of Karnataka.…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/UB_City%2C_Bangalore.JPG/960px-UB_City%2C_Bangalore.JPG",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/UB_City%2C_Bangalore.JPG/960px-UB_City%2C_Bangalore.JPG"
    ],
    "category": "city",
    "tags": [
      "gardens",
      "nightlife",
      "tech"
    ],
    "rating": 4.3,
    "reviewCount": 1200,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "September to February",
    "location": {
      "type": "Point",
      "coordinates": [
        77.5946,
        12.9716
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Hyderabad",
    "country": "India",
    "city": "Hyderabad",
    "description": "Hyderabad is the capital and largest city of the Indian state of Telangana. It occupies 650 km2 (250 sq mi) on the Deccan Plateau along the banks of the Musi River, in the northern part of Southern India. Popular for: biryani, forts, museums.",
    "shortDescription": "Hyderabad is the capital and largest city of the Indian state of Telangana.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Aerial_view_of_Durgam_cheruvu_and_Hitech_CIty.jpg/960px-Aerial_view_of_Durgam_cheruvu_and_Hitech_CIty.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Aerial_view_of_Durgam_cheruvu_and_Hitech_CIty.jpg/960px-Aerial_view_of_Durgam_cheruvu_and_Hitech_CIty.jpg"
    ],
    "category": "city",
    "tags": [
      "biryani",
      "forts",
      "museums"
    ],
    "rating": 4.4,
    "reviewCount": 1050,
    "priceLevel": "budget",
    "bestTimeToVisit": "October to February",
    "location": {
      "type": "Point",
      "coordinates": [
        78.4867,
        17.385
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Varanasi",
    "country": "India",
    "city": "Varanasi",
    "description": "Varanasi, or Kashi, is a city on the Ganges river in northern India that has a central place in the traditions of pilgrimage, death, and mourning in the Hindu world. The city also has a syncretic tradition of Islamic artisanship that underpins its religious tourism. Popular for: Ganges, temples, spiritual.",
    "shortDescription": "Varanasi, or Kashi, is a city on the Ganges river in northern India that has a central place in the traditions…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg/960px-Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg/960px-Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg"
    ],
    "category": "culture",
    "tags": [
      "Ganges",
      "temples",
      "spiritual"
    ],
    "rating": 4.8,
    "reviewCount": 1600,
    "priceLevel": "budget",
    "bestTimeToVisit": "October to March",
    "location": {
      "type": "Point",
      "coordinates": [
        82.9739,
        25.3176
      ]
    },
    "isFeatured": true,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Rishikesh",
    "country": "India",
    "city": "Rishikesh",
    "description": "Rishikesh or Hrishikesh is a municipal corporation and tehsil of the Dehradun district of the Indian state Uttarakhand. It is situated on the right bank of the Ganges river and is a pilgrimage town for Hindus associated with famous sages and yogis. Popular for: yoga, rafting, ashrams.",
    "shortDescription": "Rishikesh or Hrishikesh is a municipal corporation and tehsil of the Dehradun district of the Indian state Utt…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Trayambakeshwar_Temple_VK.jpg/960px-Trayambakeshwar_Temple_VK.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Trayambakeshwar_Temple_VK.jpg/960px-Trayambakeshwar_Temple_VK.jpg"
    ],
    "category": "adventure",
    "tags": [
      "yoga",
      "rafting",
      "ashrams"
    ],
    "rating": 4.7,
    "reviewCount": 1300,
    "priceLevel": "budget",
    "bestTimeToVisit": "September to April",
    "location": {
      "type": "Point",
      "coordinates": [
        78.2676,
        30.0869
      ]
    },
    "isFeatured": true,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Haridwar",
    "country": "India",
    "city": "Haridwar",
    "description": "Haridwar is a city and municipal corporation in the Haridwar district of Uttarakhand, India. With a population of 228,832 according to 2011 census, it is the second-largest city in the state and the largest in the district. Popular for: Ganges, temples, spiritual.",
    "shortDescription": "Haridwar is a city and municipal corporation in the Haridwar district of Uttarakhand, India.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Ganga_aarti_haridwar_01.jpg/960px-Ganga_aarti_haridwar_01.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Ganga_aarti_haridwar_01.jpg/960px-Ganga_aarti_haridwar_01.jpg"
    ],
    "category": "culture",
    "tags": [
      "Ganges",
      "temples",
      "spiritual"
    ],
    "rating": 4.5,
    "reviewCount": 700,
    "priceLevel": "budget",
    "bestTimeToVisit": "November to March",
    "location": {
      "type": "Point",
      "coordinates": [
        78.1642,
        29.9457
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Shimla",
    "country": "India",
    "city": "Shimla",
    "description": "Shimla is the summer capital and largest city of northern Indian state Himachal Pradesh. It is the state's most developed city and its centre of commerce, culture and education. Popular for: hills, colonial, cool climate.",
    "shortDescription": "Shimla is the summer capital and largest city of northern Indian state Himachal Pradesh.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Landscape_of_Shimla_%2C_Himachal_Pradesh.jpg/960px-Landscape_of_Shimla_%2C_Himachal_Pradesh.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Landscape_of_Shimla_%2C_Himachal_Pradesh.jpg/960px-Landscape_of_Shimla_%2C_Himachal_Pradesh.jpg"
    ],
    "category": "mountain",
    "tags": [
      "hills",
      "colonial",
      "cool climate"
    ],
    "rating": 4.5,
    "reviewCount": 1250,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "April to June, October to December",
    "location": {
      "type": "Point",
      "coordinates": [
        77.1734,
        31.1048
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Manali",
    "country": "India",
    "city": "Manali",
    "description": "Manali is a resort town, near Kullu town in the Kullu district in the Indian state of Himachal Pradesh. It is situated at the northern end of the Kullu Valley, formed by the Beas River. Popular for: hills, adventure, skiing.",
    "shortDescription": "Manali is a resort town, near Kullu town in the Kullu district in the Indian state of Himachal Pradesh.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/Manali_City.jpg/960px-Manali_City.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/Manali_City.jpg/960px-Manali_City.jpg"
    ],
    "category": "mountain",
    "tags": [
      "hills",
      "adventure",
      "skiing"
    ],
    "rating": 4.6,
    "reviewCount": 1450,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "May to October",
    "location": {
      "type": "Point",
      "coordinates": [
        77.1892,
        32.2432
      ]
    },
    "isFeatured": true,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Darjeeling",
    "country": "India",
    "city": "Darjeeling",
    "description": "Darjeeling is a city in the northernmost region of the Indian state of West Bengal. Located in the Eastern Himalayas, it has an average elevation of 2,045 metres (6,709 ft). Popular for: tea gardens, Himalayas, toy train.",
    "shortDescription": "Darjeeling is a city in the northernmost region of the Indian state of West Bengal.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/DarjeelingTrainFruitshop_%282%29.jpg/960px-DarjeelingTrainFruitshop_%282%29.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/DarjeelingTrainFruitshop_%282%29.jpg/960px-DarjeelingTrainFruitshop_%282%29.jpg"
    ],
    "category": "mountain",
    "tags": [
      "tea gardens",
      "Himalayas",
      "toy train"
    ],
    "rating": 4.6,
    "reviewCount": 1100,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "March to June, October to December",
    "location": {
      "type": "Point",
      "coordinates": [
        88.2627,
        27.036
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Gangtok",
    "country": "India",
    "city": "Gangtok",
    "description": "Gangtok is the capital and the most populous city of the Indian state of Sikkim. The seat of eponymous district, Gangtok is in the eastern Himalayan range, at an elevation of 1,650 m (5,410 ft). Popular for: Himalayas, monasteries, trekking.",
    "shortDescription": "Gangtok is the capital and the most populous city of the Indian state of Sikkim.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/Kangch-Goechala.jpg/960px-Kangch-Goechala.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/Kangch-Goechala.jpg/960px-Kangch-Goechala.jpg"
    ],
    "category": "mountain",
    "tags": [
      "Himalayas",
      "monasteries",
      "trekking"
    ],
    "rating": 4.6,
    "reviewCount": 980,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "March to June, September to December",
    "location": {
      "type": "Point",
      "coordinates": [
        88.6065,
        27.3389
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Goa",
    "country": "India",
    "city": "Goa",
    "description": "Goa is a state on the southwestern coast of India within the Konkan region. It is geographically separated from the Deccan highlands by the Western Ghats. Popular for: beaches, nightlife, Portuguese heritage.",
    "shortDescription": "Goa is a state on the southwestern coast of India within the Konkan region.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/BeachFun.jpg/960px-BeachFun.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/BeachFun.jpg/960px-BeachFun.jpg"
    ],
    "category": "beach",
    "tags": [
      "beaches",
      "nightlife",
      "Portuguese heritage"
    ],
    "rating": 4.7,
    "reviewCount": 2200,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "November to March",
    "location": {
      "type": "Point",
      "coordinates": [
        73.124,
        15.2993
      ]
    },
    "isFeatured": true,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Munnar",
    "country": "India",
    "city": "Munnar",
    "description": "Munnar is a town located in the Idukki district of the southwestern Indian state of Kerala. Munnar is situated at around 1,600 metres (5,200 ft) above mean sea level, in the Western Ghats mountain range. Popular for: tea plantations, hills, wildlife.",
    "shortDescription": "Munnar is a town located in the Idukki district of the southwestern Indian state of Kerala.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/960px-Munnar_Overview.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/960px-Munnar_Overview.jpg"
    ],
    "category": "nature",
    "tags": [
      "tea plantations",
      "hills",
      "wildlife"
    ],
    "rating": 4.7,
    "reviewCount": 1150,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "September to March",
    "location": {
      "type": "Point",
      "coordinates": [
        77.0595,
        10.0889
      ]
    },
    "isFeatured": true,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Kochi",
    "country": "India",
    "city": "Kochi",
    "description": "Kochi, formerly known as Cochin, is a major port city along the Malabar Coast of India bordering the Laccadive Sea. It is part of the district of Ernakulam in the state of Kerala and is the financial, industrial and commercial capital of the state. Popular for: backwaters, spices, colonial history.",
    "shortDescription": "Kochi, formerly known as Cochin, is a major port city along the Malabar Coast of India bordering the Laccadive…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/Kochi_Skyline.jpg/960px-Kochi_Skyline.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/Kochi_Skyline.jpg/960px-Kochi_Skyline.jpg"
    ],
    "category": "culture",
    "tags": [
      "backwaters",
      "spices",
      "colonial history"
    ],
    "rating": 4.5,
    "reviewCount": 900,
    "priceLevel": "budget",
    "bestTimeToVisit": "October to March",
    "location": {
      "type": "Point",
      "coordinates": [
        76.2673,
        9.9312
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Alleppey",
    "country": "India",
    "city": "Alleppey",
    "description": "Alappuzha or Alleppey is a city and municipality on the Laccadive Sea in the southern Indian state of Kerala. Popular for: backwaters, houseboats, slow travel.",
    "shortDescription": "Alappuzha or Alleppey is a city and municipality on the Laccadive Sea in the southern Indian state of Kerala.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Alappuzha_Boat_Beauty_W.jpg/960px-Alappuzha_Boat_Beauty_W.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Alappuzha_Boat_Beauty_W.jpg/960px-Alappuzha_Boat_Beauty_W.jpg"
    ],
    "category": "relaxation",
    "tags": [
      "backwaters",
      "houseboats",
      "slow travel"
    ],
    "rating": 4.7,
    "reviewCount": 1050,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "November to March",
    "location": {
      "type": "Point",
      "coordinates": [
        76.3388,
        9.4981
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Hampi",
    "country": "India",
    "city": "Hampi",
    "description": "Hampi or Hampe, also referred to as the Group of Monuments at Hampi, is a UNESCO World Heritage Site located in the town of Hampi in Vijayanagara district, east-central Karnataka, India. Popular for: ruins, temples, UNESCO.",
    "shortDescription": "Hampi or Hampe, also referred to as the Group of Monuments at Hampi, is a UNESCO World Heritage Site located i…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg/960px-Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg/960px-Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg"
    ],
    "category": "history",
    "tags": [
      "ruins",
      "temples",
      "UNESCO"
    ],
    "rating": 4.7,
    "reviewCount": 850,
    "priceLevel": "budget",
    "bestTimeToVisit": "October to March",
    "location": {
      "type": "Point",
      "coordinates": [
        76.46,
        15.335
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Mysore",
    "country": "India",
    "city": "Mysore",
    "description": "Mysore, officially Mysuru, is a city in the southern Indian state of Karnataka. It is the administrative headquarters of Mysore district and Mysore division. Popular for: palaces, festivals, silk.",
    "shortDescription": "Mysore, officially Mysuru, is a city in the southern Indian state of Karnataka.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Mysuru_Montage.jpg/960px-Mysuru_Montage.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Mysuru_Montage.jpg/960px-Mysuru_Montage.jpg"
    ],
    "category": "culture",
    "tags": [
      "palaces",
      "festivals",
      "silk"
    ],
    "rating": 4.6,
    "reviewCount": 1000,
    "priceLevel": "budget",
    "bestTimeToVisit": "October to February",
    "location": {
      "type": "Point",
      "coordinates": [
        76.6394,
        12.2958
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Ooty",
    "country": "India",
    "city": "Ooty",
    "description": "Ooty is a town and seat of the Nilgiris district in the Indian state of Tamil Nadu. It is located at an altitude of 2,240 m (7,350 ft), in the Nilgiri Mountains, which forms part of the Western Ghats, and is known by the epithet \"Queen of hill stations\". Popular for: hills, gardens, tea.",
    "shortDescription": "Ooty is a town and seat of the Nilgiris district in the Indian state of Tamil Nadu.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Ooty_lake.jpg/960px-Ooty_lake.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Ooty_lake.jpg/960px-Ooty_lake.jpg"
    ],
    "category": "mountain",
    "tags": [
      "hills",
      "gardens",
      "tea"
    ],
    "rating": 4.4,
    "reviewCount": 800,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "April to June",
    "location": {
      "type": "Point",
      "coordinates": [
        76.695,
        11.4102
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Udaipur",
    "country": "India",
    "city": "Udaipur",
    "description": "Udaipur is a city in the north-western Indian state of Rajasthan, about 415 km (258 mi) south of the state capital Jaipur. It serves as the administrative headquarters of Udaipur district. It is the historic capital of the kingdom of Mewar in the former Rajputana Agency. Popular for: lakes, palaces, romance.",
    "shortDescription": "Udaipur is a city in the north-western Indian state of Rajasthan, about 415 km (258 mi) south of the state cap…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Evening_view%2C_City_Palace%2C_Udaipur.jpg/960px-Evening_view%2C_City_Palace%2C_Udaipur.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Evening_view%2C_City_Palace%2C_Udaipur.jpg/960px-Evening_view%2C_City_Palace%2C_Udaipur.jpg"
    ],
    "category": "relaxation",
    "tags": [
      "lakes",
      "palaces",
      "romance"
    ],
    "rating": 4.8,
    "reviewCount": 1400,
    "priceLevel": "luxury",
    "bestTimeToVisit": "September to March",
    "location": {
      "type": "Point",
      "coordinates": [
        73.7125,
        24.5854
      ]
    },
    "isFeatured": true,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Jodhpur",
    "country": "India",
    "city": "Jodhpur",
    "description": "Jodhpur is the second-largest city of the north-western Indian state of Rajasthan, after its capital, Jaipur. As of 2025, the city has a population of 1.6 million. It serves as the administrative headquarters of the Jodhpur district and Jodhpur division. Popular for: blue city, forts, desert.",
    "shortDescription": "Jodhpur is the second-largest city of the north-western Indian state of Rajasthan, after its capital, Jaipur.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Mehrangarh_Fort_sanhita.jpg/960px-Mehrangarh_Fort_sanhita.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Mehrangarh_Fort_sanhita.jpg/960px-Mehrangarh_Fort_sanhita.jpg"
    ],
    "category": "culture",
    "tags": [
      "blue city",
      "forts",
      "desert"
    ],
    "rating": 4.6,
    "reviewCount": 950,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "October to March",
    "location": {
      "type": "Point",
      "coordinates": [
        73.0243,
        26.2389
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Jaisalmer",
    "country": "India",
    "city": "Jaisalmer",
    "description": "Jaisalmer, nicknamed The Golden City, is a city in the north-western Indian state of Rajasthan, located 575 kilometres (357 mi) west of the state capital Jaipur, in the heart of the Thar Desert. It serves as the administrative headquarters of Jaisalmer district. Popular for: desert, forts, dunes.",
    "shortDescription": "Jaisalmer, nicknamed The Golden City, is a city in the north-western Indian state of Rajasthan, located 575 ki…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Jaisalmer_Fort.jpg/960px-Jaisalmer_Fort.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Jaisalmer_Fort.jpg/960px-Jaisalmer_Fort.jpg"
    ],
    "category": "adventure",
    "tags": [
      "desert",
      "forts",
      "dunes"
    ],
    "rating": 4.7,
    "reviewCount": 880,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "October to February",
    "location": {
      "type": "Point",
      "coordinates": [
        70.9083,
        26.9157
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Amritsar",
    "country": "India",
    "city": "Amritsar",
    "description": "Amritsar, also known as Ambarsar, is the second-largest city in the Indian state of Punjab, after Ludhiana. Located in the Majha region, it is a major cultural, transportation and economic centre. The city is the administrative headquarters of the Amritsar district. Popular for: Golden Temple, culture, food.",
    "shortDescription": "Amritsar, also known as Ambarsar, is the second-largest city in the Indian state of Punjab, after Ludhiana.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Golden_Temple_Amritsar_Gurudwara_%28cropped%29.jpg/960px-Golden_Temple_Amritsar_Gurudwara_%28cropped%29.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Golden_Temple_Amritsar_Gurudwara_%28cropped%29.jpg/960px-Golden_Temple_Amritsar_Gurudwara_%28cropped%29.jpg"
    ],
    "category": "history",
    "tags": [
      "Golden Temple",
      "culture",
      "food"
    ],
    "rating": 4.8,
    "reviewCount": 1500,
    "priceLevel": "budget",
    "bestTimeToVisit": "October to March",
    "location": {
      "type": "Point",
      "coordinates": [
        74.8723,
        31.634
      ]
    },
    "isFeatured": true,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Chandigarh",
    "country": "India",
    "city": "Chandigarh",
    "description": "Chandigarh is a city and union territory in northwestern India, serving as a shared capital for the states of Punjab and Haryana. Situated near the foothills of the Shivalik range of Himalayas, it borders Haryana to the east and Punjab in the remaining directions. Popular for: architecture, gardens, planned city.",
    "shortDescription": "Chandigarh is a city and union territory in northwestern India, serving as a shared capital for the states of…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Open_Hand_monument%2C_Chandigarh.jpg/960px-Open_Hand_monument%2C_Chandigarh.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Open_Hand_monument%2C_Chandigarh.jpg/960px-Open_Hand_monument%2C_Chandigarh.jpg"
    ],
    "category": "city",
    "tags": [
      "architecture",
      "gardens",
      "planned city"
    ],
    "rating": 4.3,
    "reviewCount": 650,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "March to June, September to November",
    "location": {
      "type": "Point",
      "coordinates": [
        76.7794,
        30.7333
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Lucknow",
    "country": "India",
    "city": "Lucknow",
    "description": "Lucknow is a metropolis and the second largest city of the Indian state of Uttar Pradesh where it serves as the capital and the administrative headquarters of the eponymous district and division. Popular for: kebabs, culture, monuments.",
    "shortDescription": "Lucknow is a metropolis and the second largest city of the Indian state of Uttar Pradesh where it serves as th…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Harzratganj_Market%2C_Lucknow.jpg/960px-Harzratganj_Market%2C_Lucknow.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Harzratganj_Market%2C_Lucknow.jpg/960px-Harzratganj_Market%2C_Lucknow.jpg"
    ],
    "category": "food",
    "tags": [
      "kebabs",
      "culture",
      "monuments"
    ],
    "rating": 4.5,
    "reviewCount": 820,
    "priceLevel": "budget",
    "bestTimeToVisit": "November to March",
    "location": {
      "type": "Point",
      "coordinates": [
        80.9462,
        26.8467
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Bhubaneswar",
    "country": "India",
    "city": "Bhubaneswar",
    "description": "Bhubaneswar, also known as Bhubaneswara, is the capital and the largest city of the Indian state of Odisha. It is located in the Khordha district. The suburban region, especially the old town, was historically often depicted as Chakra Khetra and Ekamra Khetra. Popular for: temples, archaeology, heritage.",
    "shortDescription": "Bhubaneswar, also known as Bhubaneswara, is the capital and the largest city of the Indian state of Odisha.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Bhubaneswar_skyline_121224.jpg/960px-Bhubaneswar_skyline_121224.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Bhubaneswar_skyline_121224.jpg/960px-Bhubaneswar_skyline_121224.jpg"
    ],
    "category": "history",
    "tags": [
      "temples",
      "archaeology",
      "heritage"
    ],
    "rating": 4.5,
    "reviewCount": 620,
    "priceLevel": "budget",
    "bestTimeToVisit": "October to March",
    "location": {
      "type": "Point",
      "coordinates": [
        85.8245,
        20.2961
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Puri",
    "country": "India",
    "city": "Puri",
    "description": "Puri, also known as Jagannath Puri, is a coastal city and a Municipal Corporation in the state of Odisha in eastern India. It is the district headquarters of Puri district and is situated on the Bay of Bengal, 60 kilometres (37 mi) south of the state capital of Bhubaneswar. Popular for: beach, Jagannath Temple.",
    "shortDescription": "Puri, also known as Jagannath Puri, is a coastal city and a Municipal Corporation in the state of Odisha in ea…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Shri_Jagannatha_Temple.jpg/960px-Shri_Jagannatha_Temple.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Shri_Jagannatha_Temple.jpg/960px-Shri_Jagannatha_Temple.jpg"
    ],
    "category": "beach",
    "tags": [
      "beach",
      "Jagannath Temple"
    ],
    "rating": 4.4,
    "reviewCount": 700,
    "priceLevel": "budget",
    "bestTimeToVisit": "October to March",
    "location": {
      "type": "Point",
      "coordinates": [
        85.8312,
        19.8135
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Guwahati",
    "country": "India",
    "city": "Guwahati",
    "description": "Guwahati, formerly known as Gauhati, is the largest city of the Indian state of Assam, and also the largest metropolis in northeastern India. Dispur, the capital of Assam, is in the circuit city region located within Guwahati and is the seat of the Government of Assam. Popular for: Brahmaputra, northeast gateway.",
    "shortDescription": "Guwahati, formerly known as Gauhati, is the largest city of the Indian state of Assam, and also the largest me…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/11/Guwahati_citysky.jpg/960px-Guwahati_citysky.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/11/Guwahati_citysky.jpg/960px-Guwahati_citysky.jpg"
    ],
    "category": "nature",
    "tags": [
      "Brahmaputra",
      "northeast gateway"
    ],
    "rating": 4.3,
    "reviewCount": 550,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "October to April",
    "location": {
      "type": "Point",
      "coordinates": [
        91.7362,
        26.1445
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Kaziranga National Park",
    "country": "India",
    "city": "Kaziranga National Park",
    "description": "Kaziranga National Park is a national park and World Heritage Site in the Golaghat, Sonitpur, Biswanath and Nagaon districts of the Indian state of Assam. Popular for: wildlife, rhinos, safari.",
    "shortDescription": "Kaziranga National Park is a national park and World Heritage Site in the Golaghat, Sonitpur, Biswanath and Na…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/Beauty_of_Kaziranga_National_Park.jpg/960px-Beauty_of_Kaziranga_National_Park.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/Beauty_of_Kaziranga_National_Park.jpg/960px-Beauty_of_Kaziranga_National_Park.jpg"
    ],
    "category": "nature",
    "tags": [
      "wildlife",
      "rhinos",
      "safari"
    ],
    "rating": 4.8,
    "reviewCount": 640,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "November to April",
    "location": {
      "type": "Point",
      "coordinates": [
        93.1711,
        26.5775
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Ranthambore National Park",
    "country": "India",
    "city": "Ranthambore National Park",
    "description": "Ranthambore National Park is a national park in the Indian state of Rajasthan with an area of 1,334 km2 (515 sq mi). It is bounded to the north by the Banas River and to the south by the Chambal River. Popular for: wildlife, tigers, safari.",
    "shortDescription": "Ranthambore National Park is a national park in the Indian state of Rajasthan with an area of 1,334 km2 (515 s…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/Ranthambore_National_Park.JPG/960px-Ranthambore_National_Park.JPG",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/Ranthambore_National_Park.JPG/960px-Ranthambore_National_Park.JPG"
    ],
    "category": "nature",
    "tags": [
      "wildlife",
      "tigers",
      "safari"
    ],
    "rating": 4.7,
    "reviewCount": 720,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "October to April",
    "location": {
      "type": "Point",
      "coordinates": [
        76.5026,
        26.0173
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Leh",
    "country": "India",
    "city": "Leh",
    "description": "Leh is a city in Indian-administered Ladakh in the disputed Kashmir region. It is the largest city and the joint capital of Ladakh. Leh, located in the Leh district, has been the capital of Ladakh since the medieval period and was historically capital of the Kingdom of Ladakh. Popular for: Himalayas, monasteries, trekking.",
    "shortDescription": "Leh is a city in Indian-administered Ladakh in the disputed Kashmir region.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Leh_City_seen_from_Shanti_Stupa.JPG/960px-Leh_City_seen_from_Shanti_Stupa.JPG",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Leh_City_seen_from_Shanti_Stupa.JPG/960px-Leh_City_seen_from_Shanti_Stupa.JPG"
    ],
    "category": "adventure",
    "tags": [
      "Himalayas",
      "monasteries",
      "trekking"
    ],
    "rating": 4.8,
    "reviewCount": 900,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "June to September",
    "location": {
      "type": "Point",
      "coordinates": [
        77.5771,
        34.1526
      ]
    },
    "isFeatured": true,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Srinagar",
    "country": "India",
    "city": "Srinagar",
    "description": "Srinagar is a city in Indian-administered Jammu and Kashmir in the disputed Kashmir region. It is the largest city and summer capital of Jammu and Kashmir, which is an Indian-administered union territory. Popular for: Dal Lake, houseboats, Himalayas.",
    "shortDescription": "Srinagar is a city in Indian-administered Jammu and Kashmir in the disputed Kashmir region.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Red_and_Yellow_Tulips.JPG/960px-Red_and_Yellow_Tulips.JPG",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Red_and_Yellow_Tulips.JPG/960px-Red_and_Yellow_Tulips.JPG"
    ],
    "category": "relaxation",
    "tags": [
      "Dal Lake",
      "houseboats",
      "Himalayas"
    ],
    "rating": 4.6,
    "reviewCount": 1100,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "April to October",
    "location": {
      "type": "Point",
      "coordinates": [
        74.7973,
        34.0837
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Pondicherry",
    "country": "India",
    "city": "Pondicherry",
    "description": "Pondicherry, officially known as Puducherry, is the capital and most populous city of the Union Territory of Puducherry in India. Popular for: French colonial, beaches, cafes.",
    "shortDescription": "Pondicherry, officially known as Puducherry, is the capital and most populous city of the Union Territory of P…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Pondicherry-Rock_beach_aerial_view.jpg/960px-Pondicherry-Rock_beach_aerial_view.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Pondicherry-Rock_beach_aerial_view.jpg/960px-Pondicherry-Rock_beach_aerial_view.jpg"
    ],
    "category": "culture",
    "tags": [
      "French colonial",
      "beaches",
      "cafes"
    ],
    "rating": 4.5,
    "reviewCount": 850,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "October to March",
    "location": {
      "type": "Point",
      "coordinates": [
        79.8083,
        11.9416
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Mahabalipuram",
    "country": "India",
    "city": "Mahabalipuram",
    "description": "Mamallapuram is a town in Chengalpattu district in the southeastern Indian state of Tamil Nadu, best known for the UNESCO World Heritage Site of 7th- and 8th-century Hindu Group of Monuments at Mahabalipuram. It is one of the famous tourist sites in India. Popular for: UNESCO, stone carvings, beach.",
    "shortDescription": "Mamallapuram is a town in Chengalpattu district in the southeastern Indian state of Tamil Nadu, best known for…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/A_collage_of_Mamallapuram_town_Tamil_Nadu_India.jpg/960px-A_collage_of_Mamallapuram_town_Tamil_Nadu_India.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/A_collage_of_Mamallapuram_town_Tamil_Nadu_India.jpg/960px-A_collage_of_Mamallapuram_town_Tamil_Nadu_India.jpg"
    ],
    "category": "history",
    "tags": [
      "UNESCO",
      "stone carvings",
      "beach"
    ],
    "rating": 4.6,
    "reviewCount": 600,
    "priceLevel": "budget",
    "bestTimeToVisit": "November to March",
    "location": {
      "type": "Point",
      "coordinates": [
        80.1993,
        12.621
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Madurai",
    "country": "India",
    "city": "Madurai",
    "description": "Madurai is a major city in the Indian state of Tamil Nadu. It is the cultural capital of Tamil Nadu and the administrative headquarters of Madurai district, which is governed by the Madurai Municipal Corporation established on 1 November 1866. Popular for: temples, festivals, traditional food.",
    "shortDescription": "Madurai is a major city in the Indian state of Tamil Nadu.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Meenakshi_Amman_West_Tower.jpg/960px-Meenakshi_Amman_West_Tower.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Meenakshi_Amman_West_Tower.jpg/960px-Meenakshi_Amman_West_Tower.jpg"
    ],
    "category": "culture",
    "tags": [
      "temples",
      "festivals",
      "traditional food"
    ],
    "rating": 4.6,
    "reviewCount": 750,
    "priceLevel": "budget",
    "bestTimeToVisit": "October to March",
    "location": {
      "type": "Point",
      "coordinates": [
        78.1198,
        9.9252
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Andaman Islands",
    "country": "India",
    "city": "Andaman Islands",
    "description": "The Andaman and Nicobar Islands is a union territory of India comprising 836 islands, of which only 31 are inhabited. Popular for: islands, diving, beaches.",
    "shortDescription": "The Andaman and Nicobar Islands is a union territory of India comprising 836 islands, of which only 31 are inh…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/The_Coral_Reef_at_the_Andaman_Islands.jpg/960px-The_Coral_Reef_at_the_Andaman_Islands.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/The_Coral_Reef_at_the_Andaman_Islands.jpg/960px-The_Coral_Reef_at_the_Andaman_Islands.jpg"
    ],
    "category": "beach",
    "tags": [
      "islands",
      "diving",
      "beaches"
    ],
    "rating": 4.8,
    "reviewCount": 780,
    "priceLevel": "luxury",
    "bestTimeToVisit": "November to April",
    "location": {
      "type": "Point",
      "coordinates": [
        92.6586,
        11.7401
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Indore",
    "country": "India",
    "city": "Indore",
    "description": "Indore is the largest city of the Indian state of Madhya Pradesh where it serves as the capital and the administrative headquarters of the eponymous district and division. Popular for: street food, palaces, markets.",
    "shortDescription": "Indore is the largest city of the Indian state of Madhya Pradesh where it serves as the capital and the admini…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Indore_Rajwada01.jpg/960px-Indore_Rajwada01.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Indore_Rajwada01.jpg/960px-Indore_Rajwada01.jpg"
    ],
    "category": "food",
    "tags": [
      "street food",
      "palaces",
      "markets"
    ],
    "rating": 4.4,
    "reviewCount": 560,
    "priceLevel": "budget",
    "bestTimeToVisit": "October to March",
    "location": {
      "type": "Point",
      "coordinates": [
        75.8577,
        22.7196
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Bhopal",
    "country": "India",
    "city": "Bhopal",
    "description": "Bhopal is the capital city of the Indian state of Madhya Pradesh and the administrative headquarters of both Bhopal district and Bhopal division. It is known as the City of Lakes, due to presence of various natural and artificial lakes near the city boundary. Popular for: lakes, museums, heritage.",
    "shortDescription": "Bhopal is the capital city of the Indian state of Madhya Pradesh and the administrative headquarters of both B…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/Deewali_New_market.jpg/960px-Deewali_New_market.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/Deewali_New_market.jpg/960px-Deewali_New_market.jpg"
    ],
    "category": "history",
    "tags": [
      "lakes",
      "museums",
      "heritage"
    ],
    "rating": 4.3,
    "reviewCount": 480,
    "priceLevel": "budget",
    "bestTimeToVisit": "October to March",
    "location": {
      "type": "Point",
      "coordinates": [
        77.4126,
        23.2599
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Khajuraho",
    "country": "India",
    "city": "Khajuraho",
    "description": "Khajuraho is a city, near Chhatarpur in Chhatarpur district of the Indian state of Madhya Pradesh. One of the most popular tourist destinations in India, Khajuraho has the country's largest group of medieval Hindu and Jain temples, famous for their erotic sculptures. Popular for: temples, UNESCO, sculptures.",
    "shortDescription": "Khajuraho is a city, near Chhatarpur in Chhatarpur district of the Indian state of Madhya Pradesh.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/1_Khajuraho.jpg/960px-1_Khajuraho.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/1_Khajuraho.jpg/960px-1_Khajuraho.jpg"
    ],
    "category": "history",
    "tags": [
      "temples",
      "UNESCO",
      "sculptures"
    ],
    "rating": 4.7,
    "reviewCount": 590,
    "priceLevel": "budget",
    "bestTimeToVisit": "October to March",
    "location": {
      "type": "Point",
      "coordinates": [
        79.9199,
        24.8318
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Mount Abu",
    "country": "India",
    "city": "Mount Abu",
    "description": "Abu Raj [formerly Mount Abu ] is a hill station in the Sirohi district of the state of Rajasthan in western India. Here, the mountain forms a rocky plateau 22 km (14 mi) long by 9 km (5.6 mi) wide. Popular for: hill station, lake, Jain temple.",
    "shortDescription": "Abu Raj [formerly Mount Abu ] is a hill station in the Sirohi district of the state of Rajasthan in western In…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6b/Mount_Abu.jpg/960px-Mount_Abu.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6b/Mount_Abu.jpg/960px-Mount_Abu.jpg"
    ],
    "category": "mountain",
    "tags": [
      "hill station",
      "lake",
      "Jain temple"
    ],
    "rating": 4.4,
    "reviewCount": 520,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "March to June, October to December",
    "location": {
      "type": "Point",
      "coordinates": [
        73.7073,
        24.5929
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Kanyakumari",
    "country": "India",
    "city": "Kanyakumari",
    "description": "Kanyakumari is a town and municipality in Kanyakumari district in the state of Tamil Nadu, India. It is the southernmost tip of the contiguous Indian subcontinent and the southernmost city in mainland India, and thus it is informally referred to as \"The Land's End\". Popular for: confluence, sunrise, temple.",
    "shortDescription": "Kanyakumari is a town and municipality in Kanyakumari district in the state of Tamil Nadu, India.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Vivekananda_Rock_Memorial%2C_Kanyakumari.jpg/960px-Vivekananda_Rock_Memorial%2C_Kanyakumari.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Vivekananda_Rock_Memorial%2C_Kanyakumari.jpg/960px-Vivekananda_Rock_Memorial%2C_Kanyakumari.jpg"
    ],
    "category": "beach",
    "tags": [
      "confluence",
      "sunrise",
      "temple"
    ],
    "rating": 4.5,
    "reviewCount": 680,
    "priceLevel": "budget",
    "bestTimeToVisit": "October to March",
    "location": {
      "type": "Point",
      "coordinates": [
        77.5385,
        8.0883
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Pushkar",
    "country": "India",
    "city": "Pushkar",
    "description": "Pushkar is an ancient temple town located on the shore of Pushkar Lake near Ajmer City and headquarters of Pushkar tehsil in the Ajmer district in the Indian state of Rajasthan. It is situated about 10 km (6.2 mi) northwest of Ajmer and about 150 km southwest of Jaipur. Popular for: lake, fair, temples.",
    "shortDescription": "Pushkar is an ancient temple town located on the shore of Pushkar Lake near Ajmer City and headquarters of Pus…",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/Pushkar.jpg/960px-Pushkar.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/Pushkar.jpg/960px-Pushkar.jpg"
    ],
    "category": "culture",
    "tags": [
      "lake",
      "fair",
      "temples"
    ],
    "rating": 4.5,
    "reviewCount": 540,
    "priceLevel": "budget",
    "bestTimeToVisit": "October to November, February to March",
    "location": {
      "type": "Point",
      "coordinates": [
        74.55,
        26.4891
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Coorg",
    "country": "India",
    "city": "Coorg",
    "description": "Kodagu district is an administrative district in the Karnataka state of India. Before 1956, it was an administratively separate Coorg State at which point it was merged into an enlarged Mysore State. Popular for: coffee plantations, waterfalls, forests.",
    "shortDescription": "Kodagu district is an administrative district in the Karnataka state of India.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Tadiandamol_Valley%2C_Western_Ghats.jpg/960px-Tadiandamol_Valley%2C_Western_Ghats.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Tadiandamol_Valley%2C_Western_Ghats.jpg/960px-Tadiandamol_Valley%2C_Western_Ghats.jpg"
    ],
    "category": "nature",
    "tags": [
      "coffee plantations",
      "waterfalls",
      "forests"
    ],
    "rating": 4.7,
    "reviewCount": 620,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "October to March",
    "location": {
      "type": "Point",
      "coordinates": [
        75.7394,
        12.4191
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  },
  {
    "name": "Jim Corbett National Park",
    "country": "India",
    "city": "Jim Corbett National Park",
    "description": "Jim Corbett National Park is a national park in the Nainital district of the state of Uttarakhand, India. It was established in 1936 as the country's first national park and is named in honour of Jim Corbett, who had played a leading role in its establishment. Popular for: wildlife, tigers, jungle safari.",
    "shortDescription": "Jim Corbett National Park is a national park in the Nainital district of the state of Uttarakhand, India.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Bengal-Tiger_Corbett_Uttarakhand_Dec-2013.jpg/960px-Bengal-Tiger_Corbett_Uttarakhand_Dec-2013.jpg",
    "gallery": [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Bengal-Tiger_Corbett_Uttarakhand_Dec-2013.jpg/960px-Bengal-Tiger_Corbett_Uttarakhand_Dec-2013.jpg"
    ],
    "category": "nature",
    "tags": [
      "wildlife",
      "tigers",
      "jungle safari"
    ],
    "rating": 4.6,
    "reviewCount": 700,
    "priceLevel": "mid-range",
    "bestTimeToVisit": "November to June",
    "location": {
      "type": "Point",
      "coordinates": [
        78.942,
        29.5319
      ]
    },
    "isFeatured": false,
    "isActive": true,
    "bookingLinks": {
      "flights": "https://www.skyscanner.com/",
      "hotels": "https://www.booking.com/",
      "activities": "https://www.getyourguide.com/"
    }
  }
];

module.exports = [...internationalDestinations, ...indianDestinations];
