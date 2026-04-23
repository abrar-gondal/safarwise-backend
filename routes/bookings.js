const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/auth');
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking,
} = require('../controllers/bookingController');

router.get('/my',         protect, getMyBookings);        
router.get('/all',        protect, getAllBookings);        
router.post('/',          protect, createBooking);         
router.put('/:id/status', protect, updateBookingStatus);  
router.put('/:id/cancel', protect, cancelBooking);        

module.exports = router;