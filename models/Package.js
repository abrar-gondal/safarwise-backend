const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  destination: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
  },
  duration: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  tags: [String],
  highlights: [String],
  includes: [String],
  excludes: [String],
  itinerary: [
    {
      day: Number,
      title: String,
      activities: [String],
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Package', PackageSchema);