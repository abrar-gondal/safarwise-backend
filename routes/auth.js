const express = require('express');
const router  = express.Router();
const sendEmail = require('../utils/sendEmail');
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
// testing if emails are sending correctly
router.get('/test-email', async (req, res) => {
  try {
    await sendEmail({
      to: 'safarwise32@gmail.com',
      subject: 'Railway Test',
      html: '<h1>Working!</h1>',
    });
    res.json({ success: true, message: 'Email sent!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;