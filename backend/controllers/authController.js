const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please enter email and password');
  }

  // Find admin user
  const admin = await AdminUser.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Logout admin (client-side handles token discard, but we send success)
// @route   POST /api/auth/logout
// @access  Public
const logout = asyncHandler(async (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// @desc    Get logged in admin details
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const admin = await AdminUser.findById(req.user.id).select('-password');
  res.json(admin);
});

module.exports = {
  login,
  logout,
  getMe,
};
