const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['traveler','admin'], default: 'traveler' },
    preferences: {
      interests: [{ type: String }],
      budgetLevel: { type: String, enum: ['budget','mid-range','luxury'], default: 'mid-range' },
      favoriteDestinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
    },
    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
