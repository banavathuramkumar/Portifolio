const asyncHandler = require('express-async-handler');
const Experience = require('../models/Experience');

// @desc    Get all experiences (public)
// @route   GET /api/experience
// @access  Public
const getExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find({}).sort({ order: 1 });
  res.json(experiences);
});

// @desc    Create a new experience (admin)
// @route   POST /admin/experience
// @access  Public (no auth)
const createExperience = asyncHandler(async (req, res) => {
  const exp = await Experience.create(req.body);
  res.status(201).json(exp);
});

// @desc    Update an experience (admin)
// @route   PUT /admin/experience/:id
// @access  Public
const updateExperience = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const exp = await Experience.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!exp) {
    return res.status(404).json({ message: 'Experience not found' });
  }
  res.json(exp);
});

// @desc    Delete an experience (admin)
// @route   DELETE /admin/experience/:id
// @access  Public
const deleteExperience = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const exp = await Experience.findByIdAndDelete(id);
  if (!exp) {
    return res.status(404).json({ message: 'Experience not found' });
  }
  res.json({ message: 'Experience removed' });
});

module.exports = {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};
