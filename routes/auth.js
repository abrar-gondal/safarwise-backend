const express = require('express');
const router  = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile,
  forgotPassword,
  resetPassword,
  verifyOtp,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register',        register);
router.post('/login',           login);
router.get('/me',               protect, getMe);
router.put('/update',           protect, updateProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password',  resetPassword);
router.post('/verify-otp',      verifyOtp);
module.exports = router;