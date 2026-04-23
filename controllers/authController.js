const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email and password' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: 'Profile updated',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const forgotPassword = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Please provide your email' });
  }
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with that email' });
    }
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    const resetExpire = new Date(Date.now() + 30 * 60 * 1000); // 30 mins

    user.resetPasswordToken  = resetToken;
    user.resetPasswordExpire = resetExpire;

    user.save().then(() => {
      const html = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: #3D2B1F; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
      <h1 style="color: #C8862A; margin: 0; font-size: 28px;"> SafarWise</h1>
      <p style="color: #F5EDD6; margin: 5px 0 0;">Navigate. Explore. Discover.</p>
    </div>
    <div style="background: #FAF7F0; padding: 30px; border-radius: 0 0 10px 10px;">
      <h2 style="color: #3D2B1F;">Password Reset OTP</h2>
      <p style="color: #6B4C3B;">Assalam o Alaikum ${user.name},</p>
      <p style="color: #6B4C3B;">Your OTP code to reset your SafarWise password is:</p>
      <div style="text-align: center; margin: 30px 0;">
        <div style="background: #3D2B1F; color: #C8862A; font-size: 42px; font-weight: bold; letter-spacing: 12px; padding: 20px 40px; border-radius: 12px; display: inline-block; font-family: monospace;">
          ${resetToken}
        </div>
      </div>
      <p style="color: #6B4C3B; font-size: 14px; text-align: center;">This code expires in <strong>30 minutes</strong>.</p>
      <p style="color: #6B4C3B; font-size: 14px; text-align: center;">If you did not request this, ignore this email.</p>
      <hr style="border: none; border-top: 1px solid #e0d5c5; margin: 20px 0;">
      <p style="color: #9B6620; font-size: 12px; text-align: center;">SafarWise Travel - Lahore, Pakistan</p>
    </div>
  </div>
`;
      sendEmail({
        to: user.email,
        subject: 'SafarWise - Reset Your Password',
        html,
      }).then(() => {
        return res.status(200).json({
          success: true,
          message: 'Password reset email sent! Check your inbox.',
        });
      }).catch(() => {
        user.resetPasswordToken  = null;
        user.resetPasswordExpire = null;
        user.save();
        return res.status(500).json({ success: false, message: 'Email could not be sent. Try again.' });
      });
    }).catch((err) => {
      return res.status(500).json({ success: false, message: err.message });
    });
  }).catch((err) => {
    return res.status(500).json({ success: false, message: err.message });
  });
};
const resetPassword = (req, res) => {
  const { email, token, password } = req.body;

  if (!email || !token || !password) {
    return res.status(400).json({ success: false, message: 'Invalid request' });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  }
  User.findOne({
    email,
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: new Date() },
  }).then((user) => {
    if (!user) {
      return res.status(400).json({ success: false, message: 'Reset link is invalid or has expired' });
    }
    const salt   = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);

    user.password            = hashed;
    user.resetPasswordToken  = null;
    user.resetPasswordExpire = null;
    user.save().then(() => {
      return res.status(200).json({
        success: true,
        message: 'Password reset successful! You can now login.',
      });
    }).catch((err) => {
      return res.status(500).json({ success: false, message: err.message });
    });
  }).catch((err) => {
    return res.status(500).json({ success: false, message: err.message });
  });
};
const verifyOtp = (req, res) => {
  const { email, token } = req.body;
  if (!email || !token) {
    return res.status(400).json({ success: false, message: 'Invalid request' });
  }
  User.findOne({
    email,
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: new Date() },
  }).then(user => {
    if (!user) {
      return res.status(400).json({ success: false, message: 'Incorrect OTP or OTP has expired' });
    }
    return res.status(200).json({ success: true, message: 'OTP verified' });
  }).catch(err => {
    return res.status(500).json({ success: false, message: err.message });
  });
};
module.exports = { register, login, getMe, updateProfile, forgotPassword, resetPassword, verifyOtp };