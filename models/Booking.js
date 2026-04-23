const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'User',
    required: true,
  },
  package: {
    type:    mongoose.Schema.Types.ObjectId,
    ref:     'Package',
    default: null,
  },
  packageName:      { type: String, default: 'Package Inquiry' },
  destination:      { type: String, default: '' },
  duration:         { type: String, default: '' },
  travelDate:       { type: Date,   required: true },
  travelers:        { type: Number, required: true, min: 1 },
  totalPrice:       { type: Number, default: 0 },
  depositAmount:    { type: Number, default: 0 },
  remainingAmount:  { type: Number, default: 0 },
  paymentMethod:    { type: String, default: 'inquiry' },
  specialRequests:  { type: String, default: '' },
  bookingReference: { type: String },
  bookingStatus: {
    type:    String,
    enum:    ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  paymentStatus: {
    type:    String,
    enum:    ['pending', 'paid', 'refunded'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);