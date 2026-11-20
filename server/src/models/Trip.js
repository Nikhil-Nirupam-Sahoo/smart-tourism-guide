const mongoose = require('mongoose');
const crypto = require('crypto');

const dayPlanSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String },
    morning: { type: String },
    afternoon: { type: String },
    evening: { type: String },
    notes: { type: String },
    estimatedCost: { type: String },
  },
  { _id: false }
);

const tripSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
    title: { type: String, required: true, trim: true },
    startDate: { type: Date },
    endDate: { type: Date },
    durationDays: { type: Number, required: true },
    travelers: { type: Number, default: 1, min: 1 },
    budgetLevel: { type: String, enum: ['budget','mid-range','luxury'], default: 'mid-range' },
    interests: [{ type: String }],
    itinerary: [dayPlanSchema],
    aiGenerated: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false },
    shareToken: { type: String, sparse: true },   // public share link token
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Generate a share token before saving if public and no token
tripSchema.pre('save', function (next) {
  if (this.isPublic && !this.shareToken) {
    this.shareToken = crypto.randomBytes(16).toString('hex');
  }
  next();
});

tripSchema.index({ user: 1, createdAt: -1 });
tripSchema.index({ destination: 1 });

module.exports = mongoose.model('Trip', tripSchema);
