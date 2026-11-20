const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    city: { type: String, trim: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    image: { type: String, required: true },           // main hero image
    gallery: [{ type: String }],                       // additional images
    category: {
      type: String,
      enum: ['culture','nature','adventure','relaxation','food','history','beach','mountain','city'],
      required: true,
    },
    tags: [{ type: String }],
    rating: { type: Number, min: 0, max: 5, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    priceLevel: { type: String, enum: ['budget','mid-range','luxury'], default: 'mid-range' },
    bestTimeToVisit: { type: String },
    bookingLinks: {
      flights: { type: String },   // affiliate / booking URL
      hotels: { type: String },
      activities: { type: String },
    },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

destinationSchema.index({ location: '2dsphere' });
destinationSchema.index({ category: 1, isFeatured: -1 });
destinationSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Destination', destinationSchema);
