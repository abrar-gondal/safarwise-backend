const Booking  = require('../models/Booking');
const User     = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const createBooking = (req, res) => {
  const {
    packageName, destination, duration,
    travelDate, travelers, totalPrice,
    paymentMethod, specialRequests,
  } = req.body;
  if (!travelDate || !travelers) {
    return res.status(400).json({ success: false, message: 'Provide travelDate and travelers.' });
  }
  const bookingReference = 'SW-' + Math.floor(100000 + Math.random() * 900000);
  const numTravelers     = Number(travelers);
  const total            = Number(totalPrice) || 0;

  User.findById(req.user.id).then(foundUser => {

    return Booking.create({
      user:            req.user.id,
      package:         null,
      packageName:     packageName  || 'Package',
      destination:     destination  || '',
      duration:        duration     || '',
      travelDate:      new Date(travelDate),
      travelers:       numTravelers,
      totalPrice:      total,
      depositAmount:   Math.round(total * 0.3),
      remainingAmount: Math.round(total * 0.7),
      paymentMethod:   paymentMethod || 'inquiry',
      specialRequests: specialRequests || '',
      bookingReference,
      bookingStatus:   'pending',
      paymentStatus:   'pending',
    }).then(booking => {
      if (foundUser && foundUser.email) {
        const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:#3D2B1F;padding:20px;text-align:center;border-radius:10px 10px 0 0;">
    <h1 style="color:#C8862A;margin:0;">SafarWise</h1>
    <p style="color:#F5EDD6;margin:4px 0 0;font-size:13px;">Navigate. Explore. Discover.</p>
  </div>
  <div style="background:#FAF7F0;padding:28px;border-radius:0 0 10px 10px;">
    <h2 style="color:#3D2B1F;">Booking Request Received!</h2>
    <p style="color:#6B4C3B;">Assalam o Alaikum ${foundUser.name},</p>
    <p style="color:#6B4C3B;">Your booking inquiry has been received. Our team will contact you within 24 hours.</p>
    <div style="background:#F0E8D8;padding:16px;border-radius:8px;margin:20px 0;">
      <p style="margin:5px 0;color:#3D2B1F;"><strong>Reference:</strong> ${bookingReference}</p>
      <p style="margin:5px 0;color:#3D2B1F;"><strong>Package:</strong> ${booking.packageName}</p>
      <p style="margin:5px 0;color:#3D2B1F;"><strong>Travel Date:</strong> ${new Date(travelDate).toLocaleDateString('en-PK',{day:'numeric',month:'long',year:'numeric'})}</p>
      <p style="margin:5px 0;color:#3D2B1F;"><strong>Travelers:</strong> ${numTravelers}</p>
      <p style="margin:5px 0;color:#3D2B1F;"><strong>Total:</strong> PKR ${total.toLocaleString()}</p>
      <p style="margin:5px 0;color:#C8862A;"><strong>Status: Pending</strong></p>
    </div>
    <p style="color:#6B4C3B;">No payment needed now. We will call to confirm.</p>
    <p style="color:#3D2B1F;font-weight:bold;">Contact: +92 321 1234567</p>
    <hr style="border:none;border-top:1px solid #e0d5c5;margin:20px 0;">
    <p style="color:#9B6620;font-size:12px;text-align:center;">SafarWise , Lahore, Pakistan</p>
  </div>
</div>`;
        sendEmail({
          to:      foundUser.email,
          subject: `SafarWise - Booking: ${booking.packageName} (${bookingReference})`,
          html,
        }).catch(() => {});
      }
      return res.status(201).json({
        success: true,
        message: 'Booking submitted. Our team will call you within 24 hours.',
        booking,
      });
    });
  }).catch(err => {
    return res.status(500).json({ success: false, message: err.message });
  });
};
const getMyBookings = (req, res) => {
  Booking.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .then(bookings => {
      return res.status(200).json({ success: true, count: bookings.length, bookings });
    })
    .catch(err => {
      return res.status(500).json({ success: false, message: err.message });
    });
};
const getAllBookings = (req, res) => {
  Booking.find()
    .sort({ createdAt: -1 })
    .populate('user', 'name email phone')
    .then(bookings => {
      return res.status(200).json({ success: true, count: bookings.length, bookings });
    })
    .catch(err => {
      return res.status(500).json({ success: false, message: err.message });
    });
};
const updateBookingStatus = (req, res) => {
  const { bookingStatus } = req.body;
  const allowed = ['pending', 'confirmed', 'cancelled', 'completed'];
  if (!bookingStatus || !allowed.includes(bookingStatus)) {
    return res.status(400).json({ success: false, message: 'Invalid status.' });
  }
  Booking.findByIdAndUpdate(req.params.id, { bookingStatus }, { new: true })
    .populate('user', 'name email phone')
    .then(booking => {
      if (!booking) return res.status(404).json({ success: false, message: 'Booking not found.' });
      return res.status(200).json({ success: true, message: `Booking ${bookingStatus}.`, booking });
    })
    .catch(err => {
      return res.status(500).json({ success: false, message: err.message });
    });
};
const cancelBooking = (req, res) => {
  Booking.findOne({ _id: req.params.id, user: req.user.id })
    .then(booking => {
      if (!booking) return res.status(404).json({ success: false, message: 'Booking not found.' });
      if (booking.bookingStatus === 'completed') {
        return res.status(400).json({ success: false, message: 'Cannot cancel completed booking.' });
      }
      booking.bookingStatus = 'cancelled';
      return booking.save();
    })
    .then(booking => {
      return res.status(200).json({ success: true, message: 'Booking cancelled.', booking });
    })
    .catch(err => {
      return res.status(500).json({ success: false, message: err.message });
    });
};

module.exports = { createBooking, getMyBookings, getAllBookings, updateBookingStatus, cancelBooking };