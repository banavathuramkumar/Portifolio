const asyncHandler = require('express-async-handler');
const Profile = require('../models/Profile');
const { saveBase64File } = require('../utils/fileSaver');

// @desc    Get profile (single)
// @route   GET /api/profile
// @access  Public
const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne();
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }
  res.json(profile);
});

// @desc    Update profile
// @route   PUT /admin/profile/:id
// @access  Public
const updateProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const profile = await Profile.findById(id);
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  // Handle file uploads if they are base64 strings
  if (req.body.image) {
    req.body.image = saveBase64File(req.body.image, 'profile');
  } else {
    // Keep previous image if none uploaded in this request
    req.body.image = profile.image;
  }

  if (req.body.resumeLink) {
    req.body.resumeLink = saveBase64File(req.body.resumeLink, 'resume');
  } else {
    // Keep previous resume if none uploaded in this request
    req.body.resumeLink = profile.resumeLink;
  }

  Object.assign(profile, req.body);
  await profile.save();
  res.json(profile);
});

module.exports = {
  getProfile,
  updateProfile,
};
