const mongoose = require('mongoose');

const CityTourSchema = new mongoose.Schema({
  name:         { type: String, required: true, trim: true },
  duration:     { type: String, required: true },
  price:        { type: Number, required: true },
  image:        { type: String, default: '' },
  desc:         { type: String, required: true },
  highlights:   [String],
  difficulty:   { type: String, default: 'Easy' },
  groupSize:    { type: String, default: 'Up to 15 people' },
  overview:     { type: String, required: true },
  itinerary: [{
    time:     String,
    activity: String,
    detail:   String,
  }],
  includes:     [String],
  excludes:     [String],
  meetingPoint: { type: String, default: '' },
  featured:     { type: Boolean, default: false },
  createdAt:    { type: Date, default: Date.now },
});
module.exports = mongoose.model('CityTour', CityTourSchema);